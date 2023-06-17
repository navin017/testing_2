
import { render, screen, fireEvent, waitFor, act, queryAllByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import { BrowserRouter } from 'react-router-dom';
import { ProductComponent } from './productComponent';
import '@testing-library/jest-dom'


    const storeRender = () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductComponent />
                </BrowserRouter>
            </Provider>
        )
    }

    beforeEach(()=>{
        storeRender();
    })

describe("Overall testing for Component Availability", function () {
    test('Total DIV test', () => {
        storeRender();
        const linkElement = screen.getByTestId("all");
        expect(linkElement).toBeTruthy();
        screen.debug(linkElement)
    })
    test('component', () => {
        storeRender();
        expect(screen.getAllByTestId("component")).toBeTruthy();
    })
    test('imageComponent', () => {
        storeRender();
        expect(screen.getAllByTestId("imageComponent")).toBeTruthy();
    })
    test('listComponent', () => {
        storeRender();
        expect(screen.getAllByTestId("listComponent")).toBeTruthy();
    })
    test('3Components', () => {
        storeRender();
        expect(screen.getAllByTestId("3Components")).toBeTruthy();
    })

    //VIEW BUTTON
    test('viewComponent', () => {
        storeRender();
        expect(screen.getAllByTestId("viewComponent")).toBeTruthy();
    })
    test('view button progress testing', () => {
        // beforeEach = () => {
            storeRender();
            fireEvent.click(screen.getByTitle("view-btn"));
            expect(screen.getByTitle('view-btn')).toBeTruthy();
        // }
    })

    //EDIT BUTTON
    test('editComponent', () => {
        storeRender();
        expect(screen.getAllByTestId("editComponent")).toBeTruthy();
    })
    test('proTitle', () => {
        storeRender();
        expect(screen.getAllByTestId("proTitle")).toBeTruthy();
    })
    // test('Image Details', () => {

    //     storeRender();
    //     fireEvent.click(screen.getByTitle("view-btn"));
    //     expect(screen.getAllByTestId("imageDetails")).toBeTruthy();

    // })
    // test('Product Name Details', () => {

    //     storeRender();
    //     fireEvent.click(screen.getByTitle("view-btn"));
    //     expect(screen.getAllByTestId("detailsProName")).toBeTruthy();

    // })
    // test('Product Name Details', () => {

    //     storeRender();
    //     fireEvent.click(screen.getByTitle("view-btn"));
    //     expect(screen.getAllByTestId("detailsProId")).toBeTruthy();

    // })
    // test('Product Name Details', () => {

    //     storeRender();
    //     // fireEvent.click(screen.getByTitle("view-btn"));
    //     expect(screen.getByTestId("detailsProSiz")).toBeTruthy();

    // })

})