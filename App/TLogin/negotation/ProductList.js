'use strict';

import React, { Component } from 'react';
import { Image, FlatList, Text, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

const MAX_PRODUCT_COUNT = 15
let productsTempate = []
for(let i = 1; i < MAX_PRODUCT_COUNT; i ++) {
  productsTempate.push({
    label: i,
    key: i
  })
}

const ProductItem = ({ product, onQuantityChanged }) => {
	return (
		<View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: '#fff', }}>
      <View style={{ flex: 1, marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ height: 40, width: 40, borderRadius: 5, overflow: 'hidden', marginRight: 5, }}>
          <Image
            style={{ flex: 1, width: null, height: null }}
            source={{ uri: 'http://124.158.124.60:8080/toilet/' + product.products_image }} 
          />
        </View>
  			<Text>
  				{product.products_name}
  			</Text>
      </View>
      <ModalSelector
          data={productsTempate}
          cancelText={'Буцах'}
          initValue="1"
          style={{
            backgroundColor: '#fff',
          }}
          onChange={(option)=> onQuantityChanged(product, option.label)} 
      />
		</View>
	)
}

class ProductList extends Component {
  _renderFooter = () => {
    let { products } = this.props

    let total_price = 0
    products.forEach((product) => {
      total_price += (parseInt(product.products_price) * parseInt(product.quantity))
    })

    return (
      <View style={{ paddingVertical: 5, }}>
        <Text>
          Нийт үнэ: <Text style={{ fontWeight: 'bold' }}>{total_price}</Text>
        </Text>
      </View>
    )
  }

  render() {
    return (
      <FlatList
      	data={this.props.products}
      	renderItem={({ item, index }) => (
          <ProductItem 
            product={item} 
            onQuantityChanged={this.props.onQuantityChanged}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgrey'}} />}
        ListFooterComponent={this._renderFooter}
      />
    );
  }
}

export default ProductList;