# react-evergage-personalize

Integrate Evergage personalized recommendation data into your react web application


## What it does

 - Can listen for a specified campaign and funnel that data into your react code when the campaign becomes active for a user. Giving you access to data built in evergage for recommendations / personalization.
 - Can be used with the react-evergage-ab component to build a/b tests with personalized content.

## Installation

```
$ npm install --save react-evergage-personalize
```

## Usage

Set up your campaign in evergage with message that uses item blocks backed by a recommendation recipe.

### Basic usage - 

```javascript

    import EvergagePersonalize, { PersonalizeTypes } from "react-evergage-personalize";

    //PersonalizeTypes.Product (Product level recommendations) is the only recommendation type available right now 

    export const PersonalizedContent = () => {
        return (  
            <EvergagePersonalize type={PersonalizeTypes.Product} campaign="homepage_recommendations" render={({keys, items}) => {

                //keys are the unique identifiers of the recommended products
                //items are the items themselves. Available data will be based on what the item block you have chosen pulls in. The more data it gets the more you get.

                return (
                    <div>
                        {items.map((item) => {
                            return (
                                <div>
                                    {item._id}
                                    This is {item.name}
                                    See it at {item.url}
                                </div>
                            )
                        })}
                    </div>
                )
            }}/>
        )
    }
  
```


### Usage with [Advanced Dynamic Message Content (ADMC)](http://doc.evergage.com/display/EKB/Use+Advanced+Dynamic+Message+Content)

Since ADMC doesn't deliver the items with the Evergage campaign response, you have to use the rendered markup from Evergage. 

The EvergagePersonalize component lets you show this content where you'd like in your application.

### Basic usage - 

```javascript

    import EvergagePersonalize from "react-evergage-personalize";

    export const PersonalizedContent = () => {
        return (  
            <EvergagePersonalize campaign="homepage_recommendations" render={({markup}) => {
                return (
                    <div dangerouslySetInnerHTML={{ __html: markup }} />
                )
            }}/>
        )
    }
  
```


## Props

### type

Type: PersonalizeTypes Default: undefined

The type of recommendation you are using in evergage. Only Product is supported now.

### campaign

Type: string  Default: undefined

The name of the campaign you are testing, should correspond to the campaign in evergage.

### render

Type: Function Default: undefined

Your render function which will receive an object argument with two properties, keys and items. Keys are the unique identifiers of the recommended products. Items are the items themselves. Available data will be based on what the item block you have chosen pulls in. The more data it gets the more you get.
