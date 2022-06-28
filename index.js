const { Telegraf, Markup } = require('telegraf');
const { commands, text } = require('./const');
const fs = require('fs');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
	ctx.reply(
		`Hello, ${
			ctx.message.from.first_name ? ctx.message.from.first_name : 'Uknown user'
		}`
	);
});
bot.help((ctx) => ctx.reply(commands));
bot.command('course', async (ctx) => {
	try {
		await ctx.replyWithHTML(
			'<b>Courses</b>',
			Markup.inlineKeyboard([
				[
					Markup.button.callback('Redactors 1', 'btn_1'),
					Markup.button.callback('Redactors 2', 'btn_2'),
				],
				[Markup.button.callback('Redactors 3', 'btn_3')],
			])
		);
	} catch (error) {
		console.error(error);
	}
});

function addActionBot(name, src, text) {
	bot.action(name, async (ctx) => {
		try {
			await ctx.answerCbQuery(); // stop button loading (clock picture disappears)
			if (src) {
				await ctx.replyWithPhoto({
					source: src,
				});
			}
			await ctx.replyWithHTML(text, {
				disable_web_page_preview: true,
			});
		} catch (error) {
			console.error(error);
		}
	});
}

addActionBot('btn_1', './1.jpeg', text);
addActionBot('btn_2', './1.jpeg', text);
addActionBot('btn_3', false, text);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
