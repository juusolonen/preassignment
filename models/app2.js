
module.exports = {


            'parse' : (data, callback) => {

              
                let paragraphs = data.split('\n\n');

                //empty array for json-formatted data
                let paragraphsJSON = [];
                
                    //iterate through every pharagraph
                    paragraphs.forEach(paragraph => {
                        //empty object
                        let paragraphJSON= {};
                        
                        let lines = paragraph.split('\n');
                        //iterate through lines in paragraph
                        lines.forEach(line => {

                            let content = line.split(': ')[1];
                            let name = line.split(': ')[0];

                            if (name == 'Depends') {
                               content = content.replace(/\(.*\)/g, '').split(',');
                            }

                            if (name == 'Pre-Depends') {
                                name = 'Pre_Depends'
                                content = content.replace(/\(.*\)/g, '').split(',');
                            }
                            
                            paragraphJSON[name] = content;

                        })



                        paragraphsJSON.push(paragraphJSON);
                          
                    })

                    callback(paragraphsJSON);

                }
}




