import React from 'react';
import { View } from 'react-native';

import Bell from '../assets/profile/settings/bell.svg';
import Clock from '../assets/profile/settings/clock.svg';
import Comment from '../assets/profile/settings/comment.svg';
import Edit from '../assets/profile/settings/edit.svg';
import FlagAlt from '../assets/profile/settings/flag_alt.svg';
import Globe from '../assets/profile/settings/globe.svg';
import Group from '../assets/profile/settings/group.svg';
import GroupScan from '../assets/profile/settings/group_scan.svg';
import { SettingsButtonGroup } from '../components/SettingsButtonGroup';

export default function Settings() {
  return (
    <View>
      <SettingsButtonGroup
        title="Manage Care Group"
        buttons={[
          {
            text: 'Add User to Care Group',
            icon: <Group width="20" />,
            onPress: () => {}
          },
          {
            text: 'Manage Caregiver Capabilities',
            icon: <GroupScan />,
            onPress: () => {}
          }
        ]}
      />
      <View className="mx-auto mt-5 w-[80vw] border border-carewallet-lightergray" />
      <SettingsButtonGroup
        title="General"
        buttons={[
          { text: 'Edit Profile', icon: <Edit />, onPress: () => {} },
          {
            text: 'Edit Time Availability',
            icon: <Clock />,
            onPress: () => {}
          },
          { text: 'Language Settings', icon: <Globe />, onPress: () => {} },
          { text: 'Notifications', icon: <Bell />, onPress: () => {} }
        ]}
      />
      <View className="mx-auto mt-5 w-[80vw] border border-carewallet-lightergray" />
      <SettingsButtonGroup
        title="Contact Us"
        buttons={[
          { text: 'Help', icon: <FlagAlt />, onPress: () => {} },
          {
            text: 'Feedback & Suggestions',
            icon: <Comment />,
            onPress: () => {}
          }
        ]}
      />
    </View>
  );
}
