/**
 * Code Editor for the Cloud9 IDE
 *
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

define(function(require, exports, module) {

var ide = require("core/ide");
var ext = require("core/ext");
var util = require("core/util");
var editors = require("ext/editors/editors");
var settings = require("ext/settings/settings");

module.exports = ext.register("ext/themes/themes", {
    name    : "Themes",
    dev     : "Ajax.org",
    alone   : true,
    offline : false,
    type    : ext.GENERAL,
    nodes   : [],
    inited  : false,

    register : function(themes){
        if (this.inited)
            this.registerly(themes);
        else
            this.themes = themes;
    },

    registerly : function(themes) {
        for (var name in themes) {
            this.nodes.push(
                mnuThemes.appendChild(new apf.item({
                    caption : name,
                    type    : "radio",
                    value   : themes[name]
                }))
            );
        }
    },

    selectTheme : function() {
        this.set(lstThemes.selected.getAttribute("value"));
    },

    set : function(path){
        //Save theme settings
        settings.model.setQueryValue("editors/code/@theme", path);
        settings.save();
    },

    init : function() {},
    hook : function(){
        var _self = this;
        ide.addEventListener("init.ext/code/code", function() {
            _self.nodes.push(
                mnuEditorSettings.insertBefore(new apf.item({
                    caption : "Themes",
                    submenu : "mnuThemes"
                }), lblSyntaxHl),
                apf.document.body.appendChild(new apf.menu({
                    id : "mnuThemes",
                    onitemclick : function(e){
                        _self.set(e.relatedNode.value);
                    }
                }))
            );

            if (_self.themes)
                _self.registerly(_self.themes);

            _self.inited = true;
        });
    },

    enable : function(){
    },

    disable : function(){
    },

    destroy : function(){
    }
});

});