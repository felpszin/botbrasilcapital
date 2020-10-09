const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const db = require('quick.db');
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
// codigo 2x melhorado, se gostarem posto melhor ainda, pq tenho codigo ate pra 2030 kkkkk
client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Carregando ${commandName}...`);
    client.commands.set(commandName, props);
  });
});
const creator = "BRASIL CAPITAL"
client.on('ready', () => {
    console.log(`Bot iniciado com sucesso! | Criado por ${creator}`);
    client.user.setActivity("EXCLUSIVO DO BRASIL CAPITAL")
})
client.on('message', message => {
    if(message.content === 'iniciar' && message.channel.name === 'whitelist-' + message.author.id.substring(0, 3)){
        message.channel.bulkDelete('14');
        let acertos = 0;
        let erros = 0;
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('__**Qual o ID Apresentado no jogo?**__')
        .setDescription('Voce possui __**5 minuto**__ para responder todas perguntas! \nDigite abaixo o __**ID**__ Apresentado no jogo.')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setThumbnail('')
        ).then(p1 => {
        const firstMessageCollector = message.channel.createMessageCollector(
            (m) => m.author.id === message.author.id,//modifica o filtro KK.
            {
                time:300*1000//dois minutos
            }
        )
        const cancelWords = [
            'stop',
            'cancelar'
        ]
        firstMessageCollector.on('collect', (firstMessageCollected) =>{
            firstMessageCollected.delete();
            if (isNaN(firstMessageCollected.content)) return message.reply('Você só pode introduzir números.').then(kkkkk => {kkkkk.delete({timeout: 4000})})
            if(cancelWords.includes(firstMessageCollected.content)){
              message.channel.delete();
                p1.edit('Whitelist cancelada!')
                firstMessageCollector.stop();
                return;
            }
            firstMessageCollector.stop();
            p1.edit(new Discord.MessageEmbed()
            .setTitle('__**Qual o nome do seu personagem?**__')
            .setDescription('**Escreva abaixo o nome do seu personagem.**')
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setThumbnail('')
            ).then(p2 => {
            const secondMessageCollector = message.channel.createMessageCollector(
                (m) => m.author.id === message.author.id,//modifica o filtro KK.
                {
                    time:300*1000//1 minuto
                }
            )
            secondMessageCollector.on('collect', secondMessageCollected =>{
                secondMessageCollected.delete();
                if (!isNaN(secondMessageCollected.content)) return message.reply('Você só pode introduzir letras.').then(kkkkk => {kkkkk.delete({timeout: 4000})})
                if(cancelWords.includes(secondMessageCollected.content)){
                    message.channel.bulkDelete('14');
                    message.channel.delete();
                    p2.edit('Whitelist cancelada!')
                    secondMessageCollector.stop();
                    return;
                }
                secondMessageCollector.stop();
                p2.edit(new Discord.MessageEmbed()
                        .setTitle('__**O que é VDM?**__')
                        .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Matar alguem sem motivo.`\n\n> **2-** `Usar um veiculo como arma.` \n\n> **3-** `Se jogar na frente de um carro.`')
                        .setColor('RANDOM')
                        .setTimestamp(new Date())
                        .setThumbnail('')
            ).then(p3 => {
            const secondMessageCollector2 = message.channel.createMessageCollector(
              (m) => m.author.id === message.author.id,//modifica o filtro KK.
              {
                  time:300*1000//1 minuto
              }
          )
          secondMessageCollector2.on('collect', secondMessageCollected2 =>{
              secondMessageCollected2.delete();
              if(cancelWords.includes(secondMessageCollected2.content)){
                  message.channel.bulkDelete('14');
                  message.channel.delete();
                  p3.edit('Whitelist cancelada!')
                  secondMessageCollector2.stop();
                  return;
              }
              if (secondMessageCollected2.content === '2') {
                acertos += 1;
              } else {
                erros += 1;
              }
              secondMessageCollector2.stop();
              p3.edit(new Discord.MessageEmbed()
                      .setTitle('__**O que é RDM?**__')
                      .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Bater em alguem com motivo.`\n\n> **2-** `Usar um veiculo como arma.` \n\n> **3-** `Matar alguem sem motivo.`')
                      .setColor('RANDOM')
                      .setTimestamp(new Date())
                      .setThumbnail('')
          ).then(p4 => {
          const secondMessageCollector3 = message.channel.createMessageCollector(
            (m) => m.author.id === message.author.id,//modifica o filtro KK.
            {
                time:300*1000//1 minuto
            }
        )
        secondMessageCollector3.on('collect', secondMessageCollected3 =>{
            secondMessageCollected3.delete();
            if(cancelWords.includes(secondMessageCollected3.content)){
                message.channel.bulkDelete('14');
                message.channel.delete();
                p4.edit('Whitelist cancelada!')
                secondMessageCollector3.stop();
                return;
            }
            if (secondMessageCollected3.content === '3') {
              acertos += 1;
            } else {
              erros += 1;
            }
            secondMessageCollector3.stop();
            p4.edit(new Discord.MessageEmbed()
                    .setTitle('__**O que é Combat Logging**__')
                    .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Abusar da fisica do jogo.`\n\n> **2-** `Desconectar no meio de uma acao e nao voltar mais.` \n\n> **3-** `Matar alguem com motivo.`')
                    .setColor('RANDOM')
                    .setTimestamp(new Date())
                    .setThumbnail('')
        ).then(p5 => {
        const secondMessageCollector4 = message.channel.createMessageCollector(
          (m) => m.author.id === message.author.id,//modifica o filtro KK.
          {
              time:300*1000//1 minuto
          }
      )
      secondMessageCollector4.on('collect', secondMessageCollected4 =>{
          secondMessageCollected4.delete();
          if(cancelWords.includes(secondMessageCollected4.content)){
              message.channel.bulkDelete('14');
              message.channel.delete();
              p5.edit('Whitelist cancelada!')
              secondMessageCollector4.stop();
              return;
          }
          if (secondMessageCollected4.content === '2') {
            acertos += 1;
          } else {
            erros += 1;
          }
          secondMessageCollector4.stop();
          p5.edit(new Discord.MessageEmbed()
                  .setTitle('__**O que é Power Gaming**__')
                  .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Fazer uma emboscada para a policia.`\n\n> **2-** `Abusar da fisica do jogo.` \n\n> **3-** `Matar alguem com motivo.`')
                  .setColor('RANDOM')
                  .setTimestamp(new Date())
                  .setThumbnail('')
      ).then(p6 => {
      const secondMessageCollector5 = message.channel.createMessageCollector(
        (m) => m.author.id === message.author.id,//modifica o filtro KK.
        {
            time:120*1000//1 minuto
        }
    )
    secondMessageCollector5.on('collect', secondMessageCollected5 =>{
        secondMessageCollected5.delete();
        if(cancelWords.includes(secondMessageCollected5.content)){
            message.channel.bulkDelete('14');
            message.channel.delete();
            p6.edit('Whitelist cancelada!')
            secondMessageCollector5.stop();
            return;
        }
        if (secondMessageCollected5.content === '2') {
          acertos += 1;
        } else {
          erros += 1;
        }
        secondMessageCollector5.stop();
        p6.edit(new Discord.MessageEmbed()
        .setTitle('__**O que é DarkRP?**__')
        .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `fazer RP de estupro.`\n\n> **2-** `fazer RP obscuro.` \n\n> **3-** `Praticar um RP com contexto pesado, como por exemplo: Abuso, assédio, queimar corpos`')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setThumbnail('')
    ).then(p7 => {
    const secondMessageCollector6 = message.channel.createMessageCollector(
      (m) => m.author.id === message.author.id,//modifica o filtro KK.
      {
          time:300*1000//1 minuto
      }
  )
  secondMessageCollector6.on('collect', secondMessageCollected6 =>{
      secondMessageCollected6.delete();
      if(cancelWords.includes(secondMessageCollected6.content)){
          message.channel.bulkDelete('14');
          message.channel.delete();
          p7.edit('Whitelist cancelada!')
          secondMessageCollector6.stop();
          return;
      }
      if (secondMessageCollected6.content === '3') {
        acertos += 1;
      } else {
        erros += 1;
      }
      secondMessageCollector6.stop();
      p7.edit(new Discord.MessageEmbed()
        .setTitle('__**O que é Amor a vida?**__')
        .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Valorizar sua vida como se fosse unica.`\n\n> **2-** `Se jogar da ponte.` \n\n> **3-** `Reagir a um assalto.`')
        .setColor('RANDOM')
        .setTimestamp(new Date())
        .setThumbnail('')
      ).then(p8 => {
        const secondMessageCollector7 = message.channel.createMessageCollector(
          (m) => m.author.id === message.author.id,//modifica o filtro KK.
          {
              time:300*1000//1 minuto
          }
      )
      secondMessageCollector7.on('collect', secondMessageCollected7 =>{
          secondMessageCollected7.delete();
          if(cancelWords.includes(secondMessageCollected7.content)){
              message.channel.bulkDelete('14');
              message.channel.delete();
              p8.edit('Whitelist cancelada!')
              secondMessageCollector7.stop();
              return;
          }
          if (secondMessageCollected7.content === '1') {
            acertos += 1;
          } else {
            erros += 1;
          }
          secondMessageCollector7.stop();
          p8.edit(new Discord.MessageEmbed()
          .setTitle('__**Você é abordado por 2 caras armados com as armas apontadas na sua cabeça, o que você faria?**__')
          .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Iria entregar tudo e nao reagir, pois tenho amor a vida.`\n\n> **2-** `Iria tentar matar os 2.` \n\n> **3-** `Iria chamar a policia enquanto eles me abordam.`')
          .setColor('RANDOM')
          .setTimestamp(new Date())
          .setThumbnail('')
          ).then(p9 => {
            const secondMessageCollector8 = message.channel.createMessageCollector(
              (m) => m.author.id === message.author.id,//modifica o filtro KK.
              {
                  time:300*1000//5 minuto
              }
          )
          secondMessageCollector8.on('collect', secondMessageCollected8 =>{
              secondMessageCollected8.delete();
              if(cancelWords.includes(secondMessageCollected8.content)){
                  message.channel.bulkDelete('14');
                  message.channel.delete();
                  p9.edit('Whitelist cancelada!')
                  secondMessageCollector8.stop();
                  return;
              }
              if (secondMessageCollected8.content === '1') {
                acertos += 1;
              } else {
                erros += 1;
              }
              secondMessageCollector8.stop();
              p9.edit(new Discord.MessageEmbed()
              .setTitle('__**Você esta sendo abordado pela policia/bandido e eles não disseram que cortaram sua comunicação, o que você faria?**__')
              .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Iria chamar meus amigos para me salvarem, pois nao cortaram minha comunicação.`\n\n> **2-** `Nada, nesses casos minha comunicação é automaticamente cortada.`')
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setThumbnail('')
              ).then(p10 => {
                const secondMessageCollector9 = message.channel.createMessageCollector(
                  (m) => m.author.id === message.author.id,//modifica o filtro KK.
                  {
                      time:300*1000//5 minuto
                  }
              )
              secondMessageCollector9.on('collect', secondMessageCollected9 =>{
                  secondMessageCollected9.delete();
                  if(cancelWords.includes(secondMessageCollected9.content)){
                      message.channel.bulkDelete('14');
                      message.channel.delete();
                      p10.edit('Whitelist cancelada!')
                      secondMessageCollector9.stop();
                      return;
                  }
                  if (secondMessageCollected9.content === '2') {
                    acertos += 1;
                  } else {
                    erros += 1;
                  }
                  secondMessageCollector9.stop();
                  p10.edit(new Discord.MessageEmbed()
              .setTitle('__**Você esta assistindo um streamer e o mesmo esta planejando um roubo ao banco, o que você faria?**__')
              .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Iria entrega-lo para policia.`\n\n> **2-** `Ir atras dele e tentar se juntar ao assalto.`\n\n> **3-** `Nada, isto é contra as regras da cidade e pode ser considerado Meta Gaming.`')
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setThumbnail('')
              ).then(p11 => {
                const secondMessageCollector10 = message.channel.createMessageCollector(
                  (m) => m.author.id === message.author.id,//modifica o filtro KK.
                  {
                      time:300*1000//5 minuto
                  }
              )
                secondMessageCollector10.on('collect', secondMessageCollected10 =>{
                  secondMessageCollected10.delete();
                  if(cancelWords.includes(secondMessageCollected10.content)){
                      message.channel.bulkDelete('14');
                      message.channel.delete();
                      p11.edit('Whitelist cancelada!')
                      secondMessageCollector10.stop();
                      return;
                  }
                  if (secondMessageCollected10.content === '3') {
                    acertos += 1;
                  } else {
                    erros += 1;
                  }
                  secondMessageCollector10.stop();
                  p11.edit(new Discord.MessageEmbed()
              .setTitle('__**ocê esta de moto esportiva fugindo da policia e entra numa rua aonde a unica saida é um morro, o que você faria?**__')
              .setDescription('**Escolha uma das opcoes abaixo:**\n\n> **1-** `Iria acelerar e subir o morro.`\n\n> **2-** `iria descer da moto e fugir a pé.`\n\n> **3-** `ou iria dar meia volta e passar enpinando por cima do carro da policia?`')
              .setColor('RANDOM')
              .setTimestamp(new Date())
              .setThumbnail('')
              ).then(p12 => {
                const secondMessageCollector11 = message.channel.createMessageCollector(
                  (m) => m.author.id === message.author.id,//modifica o filtro KK.
                  {
                      time:300*1000//5 minuto
                  }
              )
                secondMessageCollector11.on('collect', secondMessageCollected11 =>{
                  secondMessageCollected11.delete();
                  if(cancelWords.includes(secondMessageCollected11.content)){
                      message.channel.bulkDelete('14');
                      message.channel.delete();
                      p11.edit('Whitelist cancelada!')
                      secondMessageCollector11.stop();
                      return;
                  }
                  if (secondMessageCollected11.content === '2') {
                    acertos += 1;
                  } else {
                    erros += 1;
                  }
                  secondMessageCollector11.stop();
                  p11.edit(new Discord.MessageEmbed()
                  .setTitle("Whitelist finalizada | BOA SORTE")
                  .setDescription(`**Olá,** ${message.author}!\n\n__Suas respostas foram registradas, logo te avisarei sobre o resultado!__`)
                  .setColor('GREEN')
                  .setTimestamp(new Date())
                  .setFooter('Bot de whitelist | Desenvolvido por BRASIL CAPITAL')
                  );
    if (acertos > 6) {
            setTimeout(() => {
                message.channel.delete();
                // message.channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: false, READ_MESSAGES: false, READ_MESSAGE_HISTORY: false });

                const mysql = require('mysql'); 
                //Entrando na mysql
                const connection = mysql.createConnection({ //Info da database, para conectar
                  host: "127.0.0.1",
                  user: "root",
                  password: "", // senha, por padrao do root e ficar nulo, entao nao mexa.
                  database: "vrp" // database onde fica a vrp_users
                });
                connection.connect((err) => {
                });
                  setInterval(function () {
                    connection.query('SELECT 1');
                  }, 5000);
              
                
                    connection.query(`UPDATE vrp_users SET whitelisted = '1' WHERE id = '${firstMessageCollected.content}'`, (err, rows) => { //atualizando a whitelist do servidor
                console.log(err, rows);
                    })     
            message.member.roles.add(db.get(`canalaprovadoadd_${message.guild.id}`));
            message.member.roles.remove(db.get(`canalaprovadoremover_${message.guild.id}`));
            message.member.setNickname(secondMessageCollected.content + ' | ' + firstMessageCollected.content); // vai alterar o apelido do cara para o nome do personagem e o id.
            client.channels.cache.get(db.get(`canalaprovados_${message.guild.id}`)).send(new Discord.MessageEmbed()
            .setTitle("Nova whitelist aprovada | BEM VINDO!!")
            .setDescription("**Informações:**\n\n**ID aprovado:** " + firstMessageCollected.content + "\n\n**Discord do aprovado:** <@" + message.author.id + ">\n\n**Quantidade de questoes acertadas:** " + acertos + "/10")
            .setColor("GREEN")
            .setTimestamp(new Date())
            );
            console.log('==========LOG==========\nUsuario: ' + message.author.username + '-' + message.author.id + '\nID Ativado: ' + firstMessageCollected.content + '\nNome do personagem: ' + secondMessageCollected.content + '\nAcertos: ' + acertos + '\nErros: ' + erros + '\n=======================');
          }, 10000);  
        } else {
      setTimeout(() => {
        message.channel.delete();
      client.channels.cache.get(db.get(`canalreprovados_${message.guild.id}`)).send(new Discord.MessageEmbed()
            .setTitle("Nova whitelist reprovada | ESTUDE UM POUCO E TENTE NOVAMENTE")
            .setDescription("**Informações:**\n\n**ID reprovado:** " + firstMessageCollected.content + "\n\n**Discord do reprovado:** <@" + message.author.id + ">\n\n**Quantidade de questoes acertadas:** " + acertos + "/10")
            .setColor("RED")
            .setTimestamp(new Date())
            );
    }, 10000)
}

    
  })
})
  })
})
})
          })
        })
    })
})
    })
})
      })
    })
})
        })
    })
})
            })
        })
    })
})
})
})
        })
    }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.id === `${db.get(`canalwhitelist_${message.guild.id}`)}`) {
    if (!message.content.startsWith('!whitelist')) return message.delete(), await message.reply("❌ Esse canal nao foi feito para bate-papo, apenas para whitelist!\n Para fazer a whitelist use: `!whitelist`").then(msg => {msg.delete({timeout: 3000})});
    message.delete();
  }
})
client.login(config.token); // nao dou suporte, nem tenta. PV = BLOCK