import { makeAutoObservable } from "mobx";

export class ProductStore {
  constructor() {
    this._types = [];
    this._collections = [];
    this._items = [];
    this._selectedType = [];
    this._selectedCollection = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 8;
    this._pageCount = 0;
    this._sortType = { name: "Новинки", value: ["updatedAt", "DESC"] };
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setCollections(collections) {
    this._collections = collections;
  }

  setItems(items) {
    this._items = items;
  }

  setSelectedType(selectedType) {
    this.setPage(1);
    this._selectedType = [selectedType.id];
  }

  addSelectedType(selectedType) {
    this.setPage(1);
    const oldArr = [...this._selectedType];
    oldArr.push(selectedType);
    this._selectedType = [...oldArr];
  }

  deleteFromSelectedType(type) {
    this.setPage(1);
    const oldArr = [...this._selectedType];
    const newArr = oldArr.filter(item => item !== type);
    this._selectedType = [...newArr];
  }


  setSelectedCollection(selectedCollection) {
    this.setPage(1);
    this._selectedCollection = selectedCollection;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  setPageCount() {
    this._pageCount = Math.ceil(this._totalCount / this._limit)
  }

  setSortType(sortType) {
    this._sortType = sortType;
  }

  get types() {
    return this._types;
  }
  get collections() {
    return this._collections;
  }
  get items() {
    return this._items;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedCollection() {
    return this._selectedCollection;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
  get pageCount() {
    return this._pageCount;
  }
  get sortType() {
    return this._sortType;
  }
}
