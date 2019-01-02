const LenoxCommand = require('../LenoxCommand.js');

module.exports = class pauseCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			description: 'Forces the bot to skip the current song without a poll!',
			format: 'pause',
			aliases: [],
			examples: ['pause'],
			clientPermissions: ['SEND_MESSAGES', 'SPEAK'],
			userPermissions: [],
			shortDescription: 'Musicplayersettings',
			dashboardsettings: true
		});
	}

	run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		const queue = msg.client.queue;
		const serverQueue = queue.get(msg.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(lang.pause_paused);
		}
		return msg.channel.send(lang.pause_nothing);
	}
};