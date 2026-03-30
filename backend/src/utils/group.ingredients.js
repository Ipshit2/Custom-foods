export const groupIngredients = (items) => {
  const grouped = {
    crust: [],
    sauce: [],
    cheese: [],
    toppings: [],
  }

  items.forEach((item) => {
    const clean = {
      id: item._id.toString(),
      name: item.name,
      price: item.price,
    }
    if (item.type === "Crust") grouped.crust.push(clean)
    if (item.type === "Sauce") grouped.sauce.push(clean)
    if (item.type === "Cheese") grouped.cheese.push(clean)
    if (item.type === "Topping") grouped.toppings.push(clean)
  })
  return grouped
}