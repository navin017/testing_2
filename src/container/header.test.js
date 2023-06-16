
import { render, screen, fireEvent, waitFor, act, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import { Header } from './header';
import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

const storeRender = () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </Provider>
    )
}
describe("Header Tests", function () {
    test('AllElements', () => {
        storeRender();
        const linkElement = screen.getByTestId("headerAll");
        expect(linkElement).toBeTruthy();
    })
    test('headingText', () => {
        storeRender();
        expect( screen.getByTestId("heading")).toBeTruthy();
    })
    test('logout_exist', () => {
        storeRender();
        expect(screen.getByTestId("logout")).toBeTruthy();
    })
    test('addProduct_exist', () => {
        storeRender();
        expect(screen.getByTestId("add_product")).toBeTruthy();
    })
    test('TotalForm', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('form')).toBeTruthy();
    })
    test('formHead', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect( screen.getByTestId('headDetails')).toBeTruthy();
    })
    test('addProductbtn', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId("add_product")).toBeTruthy();
    })
    test('formProductName', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId("productName")).toBeTruthy();
    })
    test('productNameInput', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('form')).toBeTruthy();
        fireEvent.change(screen.getByTestId('productString'), { target: { value: 'SOMETHING' } });
        expect(screen.getByTestId('productString').value).toBe('SOMETHING');
    })

    test('Error message for empty Pro-name box', () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('form')).toBeTruthy();
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proNameError')).toHaveTextContent("please enter the Product Name")
    });

    test('Dissapearing Error message for filled pro-name box', async () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTitle('proString'), { target: { value: '' }, });
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTitle('nameError')).toHaveTextContent("please enter the Product Name")
        await waitFor(async () => {
            fireEvent.change(screen.getByTitle('proString'), {
                target: { value: 'SOMETHING' },
            });
            expect(screen.queryByTitle('nameError')).toBeNull()

        });
    })

    test('formProductId', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        const productId = screen.getByTestId('productId')
        expect(productId).toBeTruthy()
    })
    test('productIdInput', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('idInteger'), { target: { value: "123" } });
        expect(screen.getByTestId('idInteger').value).toBe("123");
    })

    test('Error message for empty Pro-id box', () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('productString'), { target: { value: 'SOMETHING' } });
        expect(screen.getByTestId('productString').value).toBe('SOMETHING');
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proIdError')).toHaveTextContent("please enter the Product ID")
    });

    test('Dissapearing Error message for filled pro-Id box', async () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        await waitFor(async () => {
            fireEvent.change(screen.getByTitle('proString'), {
                target: { value: 'SOMETHING' },
            });
            expect(screen.queryByTitle('nameError')).toBeNull()
        })
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proIdError')).toHaveTextContent("please enter the Product ID")
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('idInteger'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proIdError')).toBeNull()
        });
    })

    test('formProductSize', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('productSize')).toBeTruthy()
    })

    test('productSizeInput', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByRole('option', { name: 'Small' }).selected).toBe(true)
    })

    test('checking the length of the options', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"))
        expect(screen.getByTestId("form")).toBeTruthy()
        fireEvent.click(screen.getByTestId("proSize"))
        expect(screen.getAllByTestId('proSizeSelect').length).toBe(4)
        fireEvent.click(screen.getAllByTestId('proSizeSelect')[1])
    })
    test('allow the user to change the options', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.click(screen.getByTestId("proSize"))
        fireEvent.change(screen.getByTestId('proSize'), { target: { value: 'L' } })
        let options = screen.getAllByTestId('proSizeSelect')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    })

    test('formProductQuantity', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        const productId = screen.getByTestId('productQuantity')
        expect(productId).toBeTruthy()
    })
    test('productQuantityInput', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('proQuantity'), { target: { value: "23" } });
        expect(screen.getByTestId('proQuantity').value).toBe("23");
    })

    test('Error message appearing for the empty pro-Quantity box ', async () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('productString'), { target: { value: 'SOMETHING' } });
        expect(screen.getByTestId('productString').value).toBe('SOMETHING');
        fireEvent.change(screen.getByTestId('idInteger'), { target: { value: "123" } });
        expect(screen.getByTestId('idInteger').value).toBe("123");
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proQuantityError')).toHaveTextContent("please enter the Product Quantity")
    })
    test('Dissapearing Error message for filled pro-Quantity box', async () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        await waitFor(async () => {
            fireEvent.change(screen.getByTitle('proString'), {
                target: { value: 'SOMETHING' },
            });
            expect(screen.queryByTitle('nameError')).toBeNull()
        })
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('idInteger'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proIdError')).toBeNull()
        });
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proQuantityError')).toHaveTextContent("please enter the Product Quantity")
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('proQuantity'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proQuantityError')).toBeNull()
        });
    })
    test('formProductPrice', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        const productId = screen.getByTestId('productPrice')
        expect(productId).toBeTruthy()
    })
    test('productPriceInput', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('proPrice'), { target: { value: "23" } });
        expect(screen.getByTestId('proPrice').value).toBe("23");
    })
    test('Error message for empty Pro-Price box', () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('productString'), { target: { value: 'SOMETHING' } });
        expect(screen.getByTestId('productString').value).toBe('SOMETHING');
        fireEvent.change(screen.getByTestId('idInteger'), { target: { value: "123" } });
        expect(screen.getByTestId('idInteger').value).toBe("123");
        fireEvent.change(screen.getByTestId('proQuantity'), { target: { value: "23" } });
        expect(screen.getByTestId('proQuantity').value).toBe("23");
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proPriceError')).toHaveTextContent("please enter the Price of the Product")
    });
    test('Dissapearing Error message for filled pro-price box', async () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        await waitFor(async () => {
            fireEvent.change(screen.getByTitle('proString'), {
                target: { value: 'SOMETHING' },
            });
            expect(screen.queryByTitle('nameError')).toBeNull()
        })
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('idInteger'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proIdError')).toBeNull()
        });
        fireEvent.click(screen.getByTestId('formSubmit'))
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('proQuantity'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proQuantityError')).toBeNull()
        });
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proPriceError')).toHaveTextContent("please enter the Price of the Product")
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('proPrice'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proPriceError')).toBeNull()
        });
    })
    test('formSymbol', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('symbol')).toBeTruthy()
    })
    test('productSymbolInput', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByRole('option', { name: '₹' }).selected).toBe(true)
    })
    test('checking the length of the options for product Price', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"))
        expect(screen.getByTestId("form")).toBeTruthy()
        fireEvent.click(screen.getByTestId("symbol"))
        expect(screen.getAllByTestId('proSymbol').length).toBe(2)

    })
    test('allow the user to change the Price Symbol options', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.click(screen.getByTestId("symbol"))
        fireEvent.change(screen.getByTestId('symbol'), { target: { value: 'Doll' } });
        let options = screen.getAllByTestId('proSymbol')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();

    })

    test('formProductImage', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('productImage')).toBeTruthy()
    })
    test('Error message for not uploading the image', () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.change(screen.getByTestId('productString'), { target: { value: 'SOMETHING' } });
        expect(screen.getByTestId('productString').value).toBe('SOMETHING');
        fireEvent.change(screen.getByTestId('idInteger'), { target: { value: "123" } });
        expect(screen.getByTestId('idInteger').value).toBe("123");
        fireEvent.change(screen.getByTestId('proQuantity'), { target: { value: "23" } });
        expect(screen.getByTestId('proQuantity').value).toBe("23");
        fireEvent.change(screen.getByTestId('proPrice'), { target: { value: "23" } });
        expect(screen.getByTestId('proPrice').value).toBe("23");
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proImageError')).toHaveTextContent("upload a Image with .jpeg,.png,.jpg format")
    });

    test('should display the Error message while uploading the wrong format file',async () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        const fileImage = new File(['test file content'], 'test.txt', {type: 'text/plain'});
        fireEvent.change(screen.getByTestId('proImage'), { target: { files: [fileImage] } });
        expect(screen.getByTestId('proImageError').textContent).toBe('upload a Image with .jpeg,.png,.jpg format');
    })

    test('Error message should dissapear while uploading the correct format image',async () => {
        storeRender()
        fireEvent.click(screen.getByTestId("add_product"));
        await waitFor(async () => {
            fireEvent.change(screen.getByTitle('proString'), {
                target: { value: 'SOMETHING' },
            });
            expect(screen.queryByTitle('nameError')).toBeNull()
        })
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('idInteger'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proIdError')).toBeNull()
        });
        fireEvent.click(screen.getByTestId('formSubmit'))
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('proQuantity'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proQuantityError')).toBeNull()
        });
        fireEvent.click(screen.getByTestId('formSubmit'))
        await waitFor(async () => {
            fireEvent.change(screen.getByTestId('proPrice'), {
                target: { value: '123' },
            });
            expect(screen.queryByTestId('proPriceError')).toBeNull()
        });
        fireEvent.click(screen.getByTestId("add_product"));
        fireEvent.click(screen.getByTestId('formSubmit'))
        expect(screen.getByTestId('proImageError')).toHaveTextContent("upload a Image with .jpeg,.png,.jpg format")
        fireEvent.click(screen.getByTestId('proImage'))
        const fileImage = new File(['test file content'], 'test.txt', {type: 'text/plain'});
        fireEvent.change(screen.getByTestId('proImage'), { target: { files: [fileImage] } });
        expect(screen.getByTestId('proImageError').textContent).toBe('upload a Image with .jpeg,.png,.jpg format');
        fireEvent.click(screen.getByTestId('proImage'))
        const file = new File(['test file content'], 'test.png', {type: 'image/png'});
        fireEvent.change(screen.getByTestId('proImage'), { target: { files: [file] } });
        expect(screen.queryByTestId('proImageError')).toBeNull();
    })
    test('formClose', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('formClose')).toBeTruthy()
    })
    test('formSubmit', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("add_product"));
        expect(screen.getByTestId('formSubmit')).toBeTruthy()
    })
    test('logout', () => {
        storeRender();
        fireEvent.click(screen.getByTestId("logout"));
        expect(screen.getByTestId("logout")).toBeTruthy();
    })

})




