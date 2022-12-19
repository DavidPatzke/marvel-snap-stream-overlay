const express = require('express')
const fs = require('fs');
const { get } = require('http');
const {join} = require('path'); 
const app = express()
const port = 30000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.static('public'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getPath(fileToWatch){
    const user_dir = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")

    return join(
        user_dir,      
        'LocalLow',
        'Second Dinner',
        'SNAP',
        'Standalone',
        'States',
        'nvprod',
        fileToWatch
      ).replace('Roaming\\', '');
  }

app.get('/current_deck',async (req, res) => {
    
    let playState_string =  await fs.readFileSync(getPath('PlayState.json'), {encoding:'utf8', flag:'r'});
    console.log(playState_string)
    playState_string = playState_string.replace(/\s/,'');
    const playState_json = await JSON.parse(playState_string);
    const decck_id = playState_json.SelectedDeckId;
    let collection_string = fs.readFileSync(getPath('CollectionState.json'), {encoding:'utf8', flag:'r'});
   
    collection_string = collection_string.replace(/\s/,'');;
    const collection_json = await JSON.parse(collection_string);
    const deck_data = collection_json.ServerState.Decks.find((deck) =>  deck.Id === decck_id  ) 
    res.send(deck_data)


  })


