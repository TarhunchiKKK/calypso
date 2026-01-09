## Overiew

Here are configurations of VS Code extensions that can be applied for more effective interaction with the code.

_This configurations should be applied to global `settings.json` file._

### [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

```json
{
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
        "OPTIMIZE"
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
            "icon": "verified",
            "iconColour": "mediumaquamarine"
        },
        "FIXME": {
            "icon": "tools",
            "iconColour": "burlywood"
        },
        "RECHECK": {
            "icon": "codescan",
            "iconColour": "chocolate"
        },
        "INCOMPLETE": {
            "icon": "alert",
            "iconColour": "mediumvioletred"
        },
        "BUG": {
            "icon": "bug",
            "iconColour": "crimson"
        },
        "REFACTOR": {
            "icon": "alert",
            "iconColour": "mediumvioletred"
        },
        "DELETE": {
            "icon": "checkbox",
            "iconColour": "crimson"
        },
        "OPTIMIZE": {
            "icon": "verified",
            "iconColour": "mediumvioletred"
        }
    }
}
```
