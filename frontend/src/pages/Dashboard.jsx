import React from 'react';
import CenterLayout, { CenterInnerLayout } from "components/layouts/CenterLayout";
import DashboardProfile from "components/dashboard/DashboardProfile";
import DashboardTabs from "components/dashboard/DashboardTabs";
import Loading from 'components/layouts/Loading';
import { Grid, Cell, ALIGNMENT } from 'baseui/layout-grid';
import { connect } from 'react-redux';

const Dashboard = ({ user, isAuthenticating }) => {
  if (isAuthenticating) {
    return <Loading />
  }
  return (
    <CenterLayout>
      <Grid>
        <Cell span={[4, 8, 4]}>
          <DashboardProfile user={user}/>
        </Cell>
        <Cell span={[4, 8, 8]}>
          <DashboardTabs />
        </Cell>
      </Grid>
    </CenterLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticating: state.auth.isAuthenticating,
  }
};

export default connect(mapStateToProps)(Dashboard);