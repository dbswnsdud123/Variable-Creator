// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// @ts-ignore
import * as vscode from "vscode";
import * as googleTranslate from "@vitalets/google-translate-api";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let config = vscode.workspace.getConfiguration("variable-creator");
  const api = config.api;
  const source = config.sourceLanguag;
  const target = config.targetLanguage;
  const service = TranslationServiceFactory.createServiceInstance(api);
  const docService = new DocService();
  const copyTranslationTextCommandId = "variable-creator.copyTranslationText";

  let statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  statusBarItem.command = copyTranslationTextCommandId;
  let translateInsert = vscode.commands.registerCommand(
    "variable-creator.translateInsert",
    async () => {
      docService.setCurrentEditor();
      const text = docService.getParagraph();
      try {
        if (text.trim() !== "") {
          let result = await service.translate(text, source, target);
          context.subscriptions.push(
            vscode.languages.registerCodeActionsProvider(
              "*",
              new ProvieVariable(result),
              {
                providedCodeActionKinds: ProvieVariable.providedCodeActionKinds,
              }
            )
          );
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(`Error occurs. ${error.message}`);
      }
    }
  );

  context.subscriptions.push(translateInsert);
}

export class ProvieVariable implements vscode.CodeActionProvider {
  translateResult: string;
  constructor(translateResult: string) {
    this.translateResult = translateResult;
  }
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
  ];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    if (!this.isEnglish(document, range)) {
      return;
    }

    return [this.createFix(document, range, this.translateResult)];
  }

  private isEnglish(document: vscode.TextDocument, range: vscode.Range) {
    const pattern = /[a-zA-Z]/;
    const start = range.start;
    const line = document.lineAt(start.line);
    return !pattern.test(line.text);
  }

  private createFix(
    document: vscode.TextDocument,
    range: vscode.Range,
    translate: string
  ): vscode.CodeAction {
    const fix = new vscode.CodeAction(
      `ShowTrueVari : ${translate}`,
      vscode.CodeActionKind.QuickFix
    );
    const start = range.start;
    const line = document.lineAt(start.line);
    fix.edit = new vscode.WorkspaceEdit();
    fix.edit.replace(
      document.uri,
      new vscode.Range(
        range.start,
        range.end.translate(0, line.text.length - 1)
      ),
      translate
    );
    return fix;
  }
}

interface ITranslatorService {
  translate(text: string, source: string, target: string): Promise<string>;
}

class GoogleTranslationService implements ITranslatorService {
  async translate(
    text: string,
    source: string,
    target: string
  ): Promise<string> {
    const service = googleTranslate;
    let result = await service(text, { from: source, to: target });
    return result.text;
  }
}

class TranslationServiceFactory {
  static createServiceInstance(api: string): ITranslatorService {
    switch (api.toLowerCase()) {
      case "google":
        return new GoogleTranslationService();
      default:
        return new GoogleTranslationService();
    }
  }
}

class DocService {
  editor: vscode.TextEditor | undefined;

  setCurrentEditor(): void {
    this.editor = vscode.window.activeTextEditor;
  }

  getParagraph(): string {
    if (this.editor !== undefined) {
      let startLine = this.editor.selection.start.line;
      let endLine = this.editor.selection.end.line;
      const endCharacter = this.editor.document.lineAt(endLine).text.length;
      this.editor.selection = new vscode.Selection(
        startLine,
        0,
        startLine,
        endCharacter
      );
      var paragraph = this.editor.selection;
      let result = this.editor.document.getText(paragraph);
      if (result !== undefined) {
        return result;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getSelectionText(): string {
    if (this.editor !== undefined) {
      return this.editor.document.getText(this.editor.selection);
    } else {
      return "";
    }
  }

  insertText(text: string): void {
    if (this.editor !== undefined) {
      let end = this.editor.selection.end;
      this.editor
        .edit((editBuilder) => {
          editBuilder.insert(end, "\n");
          editBuilder.insert(end, text);
        })
        .then((success) => {
          if (success && this.editor !== undefined) {
            let end = this.editor.selection.end;
            this.editor.selection = new vscode.Selection(end, end);
            let startLine = this.editor.selection.start.line;
            let endLine = this.editor.selection.end.line;
            const endCharacter =
              this.editor.document.lineAt(endLine).text.length;
            this.editor.selection = new vscode.Selection(
              startLine,
              0,
              startLine,
              endCharacter
            );
          }
        });
    }
  }
}
