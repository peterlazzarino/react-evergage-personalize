import * as React from "react";
import * as PropTypes from "prop-types";
import { PersonalizeTypes } from "./PersonalizeTypes";
import { subscribeToCampaign } from "evergage-datalayer";

const canUseDOM = typeof window !== "undefined";

declare var Evergage: any;


export interface IEvergagePersonalizeProps {
    campaign: string;
}

export interface IEvergagePersonalizeState {
    markup: string;
}

export default class EvergageRenderedExperience extends React.Component<IEvergagePersonalizeProps, IEvergagePersonalizeState> {
    constructor () {
        super();
        this.campaignListener = this.campaignListener.bind(this);
        this.state = {
            markup: null,
        };
    }
    public componentWillMount () {
        if(!canUseDOM || !Evergage) {
            return;
        }
        subscribeToCampaign(this.campaignListener, this.props.campaign);
    }
    public render () {
        const { markup } = this.state;
        if(!markup) {
            return null;
        }
        return <div dangerouslySetInnerHTML={{ __html: markup}} />
    }
    private campaignListener (campaign) {
        if(!Array.isArray(campaign.messages) || campaign.messages.length == 0){
            return null;
        }
        const htmlContent = campaign.messages[0].htmlContent;
        this.setState({
            markup: htmlContent
        });    
    }
}
