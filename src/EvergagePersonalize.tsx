import * as React from "react";
import * as PropTypes from "prop-types";
import { PersonalizeTypes } from "./PersonalizeTypes";
import { subscribeToCampaign } from "evergage-datalayer";

const canUseDOM = typeof window !== "undefined";
const evergageReady = typeof Evergage !== "undefined";

declare var Evergage: any;

export interface IPersonalizationData {
    keys: any[];
    items: any[];
    markup: string;
}

export interface IEvergagePersonalizeProps {
    type: PersonalizeTypes;
    render: (IPersonalizationData) => false | JSX.Element;
    campaign: string;
}

export interface IEvergagePersonalizeState {
    personalizationData: IPersonalizationData;
}

export default class EvergagePersonalize extends React.Component<IEvergagePersonalizeProps, IEvergagePersonalizeState> {
    constructor () {
        super();
        this.campaignListener = this.campaignListener.bind(this);
        this.state = {
            personalizationData: null,
        };
    }
    public componentWillMount () {
        if(canUseDOM && evergageReady) {
            subscribeToCampaign(this.campaignListener, this.props.campaign);
        }
    }
    public render () {
        const { render: renderFn, children: child } = this.props;
        const { personalizationData } = this.state;
        if(!personalizationData) {
            return null;
        }
        const childProps = {
            keys: personalizationData.keys,
            items: personalizationData.items,
            markup: personalizationData.markup,
        };
        return renderFn
            ? renderFn(childProps)
            : React.cloneElement(React.Children.only(child), childProps);
    }
    private mapPropertiesByType (type, messages) {
        switch (type) {
            case PersonalizeTypes.Product:
                return {
                    items: [].concat.apply([], messages.map((x) => x["promotedItems"])),
                    keys: [].concat.apply([], messages.map((x) => x["promotedItemKeys"])),
                    markup: messages[0].htmlContent
                };
        }
    }
    private campaignListener (campaign) {
        const { type } = this.props;
        this.setState({
            personalizationData: this.mapPropertiesByType(type, campaign.messages),
        });    
    }
}
