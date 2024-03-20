import { makeAutoObservable } from "mobx";

export class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = { role: "ADMIN" };
    //this._user ={role: "USER"};
    this._basketId = 0;
    this._basketCount = 0;
    this._basketItems = [];
    this._favoriteId = 0;
    this._favoritesCount = 0;
    this._favoritesItems = [];
    this._orderItems = [];
    this._toLogin = false;
    this._searching = false;
    //local basket
    this._localBasket = [];
    this._localFavorites = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }
  // basket
  setBasketId(basketId) {
    this._basketId = basketId;
  }
  setBasketCount(basketCount) {
    this._basketCount = basketCount;
  }
  setBasketItems(basketItems) {
    this._basketItems = basketItems;
  }
  setOrderItems(orderItems) {
    this._orderItems = orderItems;
  }
  setToLogin(state) {
    this._toLogin = state;
  }
  setSearching(state) {
    this._searching = state;
  }

  // favorite
  setFavoriteId(favoriteId) {
    this._favoriteId = favoriteId;
  }
  setFavoritesCount(favoritesCount) {
    this._favoritesCount = favoritesCount;
  }
  setFavoritesItems(favoritesItems) {
    this._favoritesItems = favoritesItems;
  }

  // local basket
  addToLocalBasket(productId, selectedSize, quantity) {
    if (
      !this._localBasket.find(
        (item) =>
          item.productId === productId && item.selectedSize === selectedSize
      )
    ) {
      this._localBasket.push({
        productId: productId,
        selectedSize: selectedSize,
        quantity: quantity,
      });
    }
  }
  parseLocalBasket(localBasket) {
    this._localBasket = localBasket;
  }
  removeFromLocalBasket(id, selectedSize) {
    this._localBasket = this._localBasket.filter(
      (item) => item.productId !== id || item.selectedSize !== selectedSize
    );
  }

  // local favorite
  addToLocalFavorites(productId) {
    if (!this._localFavorites.find((item) => item.productId === productId)) {
      this._localFavorites.push({ productId: productId });
    }
  }
  parseLocalFavorites(localFavorites) {
    this._localFavorites = localFavorites;
  }
  removeFromLocalFavorites(id) {
    this._localFavorites = this._localFavorites.filter(
      (item) => item.productId !== id
    );
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get basketId() {
    return this._basketId;
  }
  get basketCount() {
    return this._basketCount;
  }
  get basketItems() {
    return this._basketItems;
  }
  get favoriteId() {
    return this._favoriteId;
  }
  get favoritesItems() {
    return this._favoritesItems;
  }
  get orderItems() {
    return this._orderItems;
  }
  get toLogin() {
    return this._toLogin;
  }
  get searching() {
    return this._searching;
  }
  get localBasket() {
    return this._localBasket;
  }
  get localFavorites() {
    return this._localFavorites;
  }
}
