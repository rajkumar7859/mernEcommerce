class ApiFeatures{
    constructor(query , queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const productname=this.queryStr.productname?{
            productName:{
                $regex:this.queryStr.productname,
                $options:"i",
            },
        }:{};

        this.query=this.query.find({...productname})
        return this;
    }

    filter(){
        const queryCopy ={...this.queryStr};
        // Removing some fields for category
        const removeFields=["productname" , "page" , "limit"]

        removeFields.forEach((key)=> delete queryCopy[key]);


        let queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        this.query=this.query.find(JSON.parse(queryStr))

        console.log(queryStr);
        return this
    }
}

module.exports=ApiFeatures