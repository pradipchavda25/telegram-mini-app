import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <NavLink to="/" exact className="nav-link" activeClassName="active">
                <i className="fa fa-home"></i>
                <span>Home</span>
            </NavLink>
            <NavLink to="/conversion" className="nav-link" activeClassName="active">
                <i className="fa fa-exchange-alt"></i>
                <span>Conversion</span>
            </NavLink>
            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                <i className="fa fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/earn" className="nav-link" activeClassName="active">
                <i className="fa fa-coins"></i>
                <span>Earn</span>
            </NavLink>
            <NavLink to="/leaderboard" className="nav-link" activeClassName="active">
                <i className="fa fa-trophy"></i>
                <span>Leaderboard</span>
            </NavLink>
        </div>
    );
};

export default BottomNav;
