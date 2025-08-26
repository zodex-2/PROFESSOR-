const { client } = global;
const fs = require("fs-extra");
const path = require("path");
const { configCommands } = global.GoatBot;

module.exports = {
	config: {
		name: "cmd",
		version: "1.17",
		author: "NTKhang",
		countDown: 5,
		role: 3, // শুধু admin বা owner use করতে পারবে
		description: {
			vi: "Quản lý các tệp lệnh của bạn",
			en: "Manage your command files"
		},
		category: "owner",
		guide: {
			en: "   {pn} load <command file name>\n   {pn} loadAll\n   {pn} install <url> <command file name>\n   {pn} install <command file name> <code>"
		},
		// এখানে UID বসানো হলো
		privateFor: ["61579681084940"]
	},

	onStart: async ({ args, message, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, event, commandName, getLang }) => {
		// শুধু private UID ব্যবহারকারীদের জন্য allow
		if (!module.exports.config.privateFor.includes(event.senderID))
			return message.reply("⚠️ | তুমি এই কমান্ড ব্যবহার করতে পারবে না।");

		const { unloadScripts, loadScripts } = global.utils;

		if (args[0] == "load" && args[1]) {
			const infoLoad = loadScripts("cmds", args[1], global.utils.log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
			infoLoad.status == "success" ? message.reply(getLang("loaded", infoLoad.name)) : message.reply(getLang("loadedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message));
		} else if ((args[0] || "").toLowerCase() == "loadall") {
			const fileNeedToLoad = fs.readdirSync(__dirname).filter(file => file.endsWith(".js") && !configCommands.commandUnload?.includes(file)).map(item => item.split(".")[0]);
			for (const fileName of fileNeedToLoad) loadScripts("cmds", fileName, global.utils.log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
			message.reply(`✅ | সব command লোড সম্পন্ন`);
		} else if (args[0] == "unload" && args[1]) {
			const infoUnload = unloadScripts("cmds", args[1], configCommands, getLang);
			infoUnload.status == "success" ? message.reply(getLang("unloaded", infoUnload.name)) : message.reply(getLang("unloadedError", infoUnload.name, infoUnload.error.name, infoUnload.error.message));
		} else if (args[0] == "install" && args[1] && args[2]) {
			message.reply("⚠️ | Install কমান্ড চালু হয়নি, Dev mode ছাড়া কাজ করবে না।");
		} else message.SyntaxError();
	}
};
