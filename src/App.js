import React from 'react';

const title = 'My Minimal React Webpack Babel Setup 123';

//components
import Input from '../src/components/items/form/FormInput';
import TextArea from '../src/components/items/form/TextArea';
import Button from './components/items/form/FormButton';
import ActionButton from '../src/components/items/form/ActionButton';

import Thumbnail from '../src/components/items/card/Thumbnail';
import Card from '../src/components/items/card/Card';

const items = [
    {
        id: 1,
        type: "video",
        localtion: "location",
        time: "time",
        title: "Title title title",
        description: "One1111111111111111111111111111111111111111111111111111111111111111111111 of the biggest complaints I hear about TDD and unit tests is that people struggle with all of the mocking required to isolate units. Some people struggle to understand how their unit tests are even meaningful. In fact, I’ve seen developers get so lost in mocks, fakes, and stubs that they wrote entire files of unit tests where no actual implementation code was exercised at all. Oops.",
        previewImgUrl: "https://images-assets.nasa.gov/image/PIA11189/PIA11189~thumb.jpg",
        fileUrl: ""
    },
    {
        id: 2,
        type: "video",
        localtion: "location",
        time: "time",
        title: "Title title title",
        description: "One of the biggest complaints I hear about TDD and unit te",
        previewImgUrl: "https://images-assets.nasa.gov/image/PIA11189/PIA11189~thumb.jpg",
        fileUrl: ""
    }
]

const App = () => (
    <div>
        <div>
            <Input id={"test"} label={"Title"} tabIndex={"1"} />
        </div>
        <div>
            <TextArea id={"testarea"} label={"Title"} tabIndex={"2"} />
        </div>
        <div>
            <Button text={"Add new item"} type={"add"} tabIndex={"3"} />
        </div>
        <div>
            <Button text={"Save"} type={"check"} tabIndex={"4"} />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <ActionButton type="favorite" tabIndex={"5"} />
            <ActionButton type="remove" tabIndex={"6"} />
            <ActionButton type="edit" tabIndex={"7"} />
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
            {items.map(item => <Card key={item.id} item={item} mode="view" />)}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
            {items.map(item => <Card key={item.id} item={item} mode="search" />)}
        </div>
    </div>
);

export default App;