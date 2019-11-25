import React from "react";
import "./App.css";
// import Header from "./components/header"
import { productsWithImages, images } from "./images/imagesLoader";

import ButtonAppBar from "./components/navBar/index";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import SignIn from "./components/pages/signIn";
import SignUp from "./components/pages/signUp";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            cat: "all",
            // filters: { searchValue: "", onSale: false },
            searchValue: "",
            onSale: false,
            connectedUser: "Gal",
            filteredProductList: productsWithImages,
            fullProductList: productsWithImages,
            pow: Math.round(Math.random() * 4),
            cart: []
        };
    }

    searchOperation = (
        searchText: string,
        onSale: Boolean,
        cat?: string
    ): void => {
        const { fullProductList } = this.state;
        const filteredData = fullProductList.filter((product: any) => {
            const isOnSale = onSale ? product.onSale : true;
            const isCat = cat !== "all" ? product.Category === cat : true;
            return (
                product.Name.toLowerCase().includes(searchText) && isOnSale && isCat
            );
        });
        this.setState({
            cat,
            filteredProductList: filteredData,
            searchValue: searchText,
            onSale
        });
    };

    addBookFather = (book: any) => {
        this.setState({ books: [...this.state.books, book] });
    };

    addToCart = (product: any) => {
        this.setState({ cart: [...this.state.cart, product] });
    };

    render() {
        const {
            connectedUser,
            cart,
            pow,
            filteredProductList,
            fullProductList,
            onSale,
            searchValue
        } = this.state;
        const searchProps = {
            cat: this.state.cat,
            categories: getCategories(fullProductList),
            searchOperation: this.searchOperation,
            onSale,
            searchValue
        };
        return (
            <div className="App">
                <BrowserRouter>
                    <ButtonAppBar />

                    <Switch>
                        <Route path="/signIn" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/home" component={Home} />
                        <Route path="**" component={() => <h1> Not Found! </h1>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function getCategories(products: Array<any>) {
    return Object.keys(
        products.reduce(
            (allCats, p: any) => {
                return { ...allCats, [p.Category]: true };
            },
            { all: true }
        )
    );
}

export default App;
