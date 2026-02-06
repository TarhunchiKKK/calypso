## Overiew

Here are configurations of VS Code extensions that can be applied for more effective interaction with the code.

_This configurations should be applied to global `settings.json` file._

### [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

```json
"todo-tree.general.tags": [
    "BUG",
    "HACK",
    "FIXME",
    "RECHECK",
    "INCOMPLETE",
    "TODO",
    "USEFUL",
    "REFACTOR",
    "DELETE",
    "OPTIMIZE",
    "DOC",
    "WARN",
    "QUESTION"
],
"todo-tree.highlights.defaultHighlight": {
    "icon": "alert",
    "type": "text-and-comment",
    "background": "transparent",
    "iconColour": "blue",
    "gutterIcon": true
},
"todo-tree.highlights.customHighlight": {
    "TODO": {
        "icon": "checkbox",
        "iconColour": "yellow"
    },
    "USEFUL": {
        "icon": "comment",
        "iconColour": "mediumaquamarine"
    },
    "FIXME": {
        "icon": "tools",
        "iconColour": "burlywood"
    },
    "WARN": {
        "icon": "alert",
        "iconColour": "yellow"
    },
    "RECHECK": {
        "icon": "codescan",
        "iconColour": "chocolate"
    },
    "INCOMPLETE": {
        "icon": "beaker",
        "iconColour": "aquamarine"
    },
    "BUG": {
        "icon": "bug",
        "iconColour": "crimson"
    },
    "REFACTOR": {
        "icon": "code",
        "iconColour": "mediumvioletred"
    },
    "DELETE": {
        "icon": "trash",
        "iconColour": "crimson"
    },
    "OPTIMIZE": {
        "icon": "rocket",
        "iconColour": "mediumaquamarine"
    },
    "DOC": {
        "icon": "note",
        "iconColour": "mediumvioletred"
    },
    "QUESTION": {
        "icon": "question",
        "iconColour": "yellow"
    }
}
```

### [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

```json
"editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.removeUnusedImports": "explicit"
},
```

### [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

```json
"cSpell.words": [
    "Decoratable",
    "dtos",
    "Formatable",
    "Renderable",
    "shadcn"
  ]
```
