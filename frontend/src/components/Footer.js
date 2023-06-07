import React, {Component} from 'react';
import './styles.css'


export class Footer extends  Component {

    render() {
        return(
<div class="footer">
            <div className="d-flex align-items-center text-center">
                <div className="footer-text">Copyright © 2019</div>
                <div className="footer-text">HodlInfo.com</div>
                <div class="footer-text pointer" style={{ "margin-left": "auto" }}>
                    <a href="mailto:support@hodlinfo.com" class="footer-text-link">Support</a>
                </div>
            </div>
</div>
        )
    }
}