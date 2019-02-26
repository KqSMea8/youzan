export namespace RetailGoodsRetailStockStockallotClose {
    /**
     * 请求参数
     */
    export interface Request {
        /**
         * 业务单据号
         */
        biz_bill_no?: string;
        /**
         * 来源
         */
        retail_source?: string;
    }

    /**
     * 响应参数
     */
    export interface Response {
        /**
         * 是否成功
         */
        response?: PlainBoolResult;
    }

    /**
     * 是否成功
     */
    export interface PlainBoolResult {
        /**
         * 是否成功
         */
        is_success?: boolean;
    }

}