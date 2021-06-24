import { ProductoTC } from "../db/models/producto.model";

export const ProductoQuery = {
    productoById: ProductoTC.getResolver('findById'),
    productoByIds: ProductoTC.getResolver('findByIds'),
    productoOne: ProductoTC.getResolver('findOne'),
    productoMany: ProductoTC.getResolver('findMany'),
    // productoCount: ProductoTC.getResolver('count'),
    // productoConnection: ProductoTC.getResolver('connection'),
    // productoPagination: ProductoTC.getResolver('pagination'),
};

export const ProductoMutation = {
    productoCreateOne: ProductoTC.getResolver('createOne'),
    productoCreateMany: ProductoTC.getResolver('createMany'),
    // productoUpdateById: ProductoTC.getResolver('updateById'),
    // productoUpdateOne: ProductoTC.getResolver('updateOne'),
    // productoUpdateMany: ProductoTC.getResolver('updateMany'),
    // productoRemoveById: ProductoTC.getResolver('removeById'),
    // productoRemoveOne: ProductoTC.getResolver('removeOne'),
    // productoRemoveMany: ProductoTC.getResolver('removeMany'),
};