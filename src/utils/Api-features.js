import { model } from "mongoose"
import { paginationFunction } from "./pagination.js"

/*
    search 
    sort
    pagination
*/
export class ApIFeatures{
    // MongooseQuery = model.find;
    // query = req.query
    constructor(query,MongooseQuery){

        this.query = query
        this.MongooseQuery = MongooseQuery
    }
    pagination({page,size}){
    const {limit,skip} = paginationFunction({page,size})
    console.log({limit,skip});
    this.MongooseQuery = this.MongooseQuery.limit(limit).skip(skip)
    return this
    }
    sort(sortBy) {
        if (!sortBy) {
            this.MongooseQuery = this.MongooseQuery.sort({ createdAt: -1 })
            return this
        }
        const formula = sortBy.replace(/desc/g, -1).replace(/asc/g, 1).replace(/ /g, ':') // 'stock  desc' => 'stock: -1'
        const [key, value] = formula.split(':')

        this.MongooseQuery = this.MongooseQuery.sort({ [key]: +value })
        return this
    }
    search(search) {
        const queryFiler = {}

        if (search.title) queryFiler.title = { $regex: search.title, $options: 'i' }
        if (search.desc) queryFiler.desc = { $regex: search.desc, $options: 'i' }
        if (search.discount) queryFiler.discount = { $ne: 0 }
        if (search.priceFrom && !search.priceTo) queryFiler.appliedPrice = { $gte: search.priceFrom }
        if (search.priceTo && !search.priceFrom) queryFiler.appliedPrice = { $lte: search.priceTo }
        if (search.priceTo && search.priceFrom) queryFiler.appliedPrice = { $gte: search.priceFrom, $lte: search.priceTo }
        console.log(queryFiler);
        this.MongooseQuery = this.MongooseQuery.find(queryFiler)
        return this
    }
    filters(filters) {
        console.log(filters);
        /**
         * the filters will contian data like this
         * @params will be in this formate
            appliedPrice[gte]=100 
            stock[lte]=200
            discount[ne]=0
            title[regex]=iphone
        */
        const queryFilter = JSON.parse(
            JSON.stringify(filters).replace(
                /gt|gte|lt|lte|in|nin|eq|ne|regex/g,
                (operator) => `$${operator}`,
            ),
        )

        /**
         * @object will be like this after the replace method
         * { appliedPrice: { $gte: 100 }, stock: { $lte: 200 }, discount: { $ne: 0 }, title: { $regex: 'iphone' } 
         */
        this.MongooseQuery.find(queryFilter)
        return this
    }
}