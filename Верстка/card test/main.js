// function renderCart(items) {
//     const $cart = document.querySelector(".cart")
//     const $total = document.querySelector(".total")
//     const $totalQuantity = document.querySelector(".total-quantity")
//     let totalQuantity = 0

//     $cart.innerHTML = items.map((item) => {
//         totalQuantity += item.quantity
//         return `
//             <tr>
//                 <td>#${item.id}</td>
//                 <td>${item.name}</td>
//                 <td>${item.quantity}</td>
//                 <td style="width: 60px;">	
//                     <button type="button" class="btn btn-block btn-sm btn-outline-primary"
//                         onClick="cartLS.quantity(${item.id},1)">+</button>
//                 </td>
//                 <td style="width: 60px;">	
//                     <button type="button" class="btn btn-block btn-sm btn-outline-primary"
//                         onClick="cartLS.quantity(${item.id},-1)">-</button>
//                 </td>
//                 <td class="text-right">$${item.price}</td>
//                 <td class="text-right"><Button class="btn btn-primary" onClick="cartLS.remove(${item.id})">Delete</Button></td>
//             </tr>`
//         }).join("")
//     $total.innerHTML = "рубли" + cartLS.total()
//     $totalQuantity.innerHTML = totalQuantity
// }
// renderCart(cartLS.list())
// cartLS.onChange(renderCart)