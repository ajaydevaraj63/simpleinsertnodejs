var exp=require('express')
var Mng=require('mongoose')
var bdyp=require('body-parser')
const App=exp()
App.use(bdyp.urlencoded({extended:true}))
App.use(bdyp.json())
const connect=async()=>{
      try {
            await Mng.connect("mongodb+srv://mzc_mca:qwerty.1@cluster0.weiqp.mongodb.net/receipeDB",{UseNewUrlParser:true})
            console.log("connected")
       } catch (error) {
         throw error    
       }
}
var usermodel=Mng.model("usertable",new Mng.Schema({
      title:String,
      ctgry:String,
      desc:String,
      shnme:String

}))
App.use((req, res, next) => { 
      res.setHeader("Access-Control-Allow-Origin", "*");  
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
      next(); });

 App.post("/api/add",(req,res)=>{

      var data=req.body;
      var schema=new usermodel(data)
      schema.save((error,data)=>{

       if(error){
            res.send({"error":error})
       }
       else{
            res.send({"data":data})
       }

      })
 })     
App.listen(6002,()=>{
connect()
console.log("running")


})