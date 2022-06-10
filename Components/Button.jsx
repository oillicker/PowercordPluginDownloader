const { React, i18n: { Messages } } = require("powercord/webpack");
const { Clickable } = require("powercord/components");
const downloadPlugin = require("../download.js");

module.exports = class Button extends React.Component {
    
    render() {
        const [GitURL, , , RepoName] = this.props.message.content.match(/https?:\/\/(www.)?git(hub).com\/[\w-]+\/([\w-\._]+)\/?/) ?? [];
        if (!GitURL) return <></>;

        let installed = this.props.type === "plugin" ?
            powercord.pluginManager.isInstalled(RepoName) :
            powercord.styleManager.isInstalled(RepoName);

        if (!this.props.message.content.includes("https://github.com")) {
            return (
                <div className={["PluginDownloaderApply", installed ? "applied" : ""].filter(Boolean).join(" ")}>
                    <Clickable
                        onClick={() => {
                            if (installed) return;
                            downloadPlugin(GitURL, powercord, this.props.type);
                        }}
                    >
                        No Plugin.
                    </Clickable>
                </div>
            )
        } else {
            return (
                <div
                    className={["PluginDownloaderApply", installed && "applied"]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <Clickable
                        onClick={() => {
                            if (installed) return;
                            downloadPlugin(GitURL, powercord, this.props.type);
                        }}
                    >
                        {installed ? `${this.props.type === "plugin" ? "Plugin" : "Theme"} Installed` : `Download ${this.props.type === "plugin" ? "Plugin" : "Theme"}`}
                    </Clickable>
                </div>
            )
        }
    }
}