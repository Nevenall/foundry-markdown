
Hooks.once("init", async function () { 

      console.log('Intitialize Markdown Module --> overriding editor helper with EasyMDE based one')

   // Register an inline markdown editor helper
   Handlebars.registerHelper('editor', function (options) {

      // texteditor enrich html. 

      let target = options.hash['target'],
         content = options.hash['content'] || "",
         button = Boolean(options.hash['button']),
         owner = Boolean(options.hash['owner']),
         editable = Boolean(options.hash['editable'])


      if (!target) throw new Error("You must define the name of a target field.")

      // Enrich the content
      // this will do foundry specific stuff to html. We want to run it, for secrets and such, but we'll have to do it 
      content = TextEditor.enrichHTML(content, { secrets: owner, entities: true })

      // Construct the HTML
      let editor = $(`<div class="editor"><div class="editor-content" data-edit="${target}">${content}</div></div>`)

      // Append edit button
      if (button && editable) editor.append($('<a class="editor-edit"><i class="fas fa-edit"></i></a>'))
      return new Handlebars.SafeString(editor[0].outerHTML)


   })

})