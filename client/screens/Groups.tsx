import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  addUserToCareGroup,
  createCareGroup,
  getGroupMembers
} from '../services/group';

export default function GroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [role, setRole] = useState('');
  // Setting this default 1 for now (to test get members),
  // but will automically be set to the new group id when a group is created
  const [groupId, setGroupId] = useState<string>('1');
  const [members, setMembers] = useState<string[]>([]);

  // Fetch group members when groupId changes
  useEffect(() => {
    if (groupId) {
      getGroupMembers(groupId)
        .then((data) => setMembers(data))
        .catch((error) => console.error('Error fetching members:', error));
    }
  }, [groupId]);

  // Create a new care group
  const handleCreateGroup = async () => {
    try {
      const newGroupId = await createCareGroup(groupName);
      setGroupId(newGroupId.toString());
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  // Add a user to the care group
  const handleAddUser = async () => {
    try {
      await addUserToCareGroup(userId, groupId, role);
      getGroupMembers(groupId)
        .then((data) => setMembers(data))
        .catch((error) => console.error('Error fetching members:', error));
    } catch (error) {
      console.error('Error adding user to group:', error);
    }
  };

  // Rendering (scuffed but it works for now)
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Group Name"
      />
      <Button title="Create Group" onPress={handleCreateGroup} />

      <TextInput
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
        placeholder="User ID"
      />
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        placeholder="Role"
      />
      <Button title="Add User" onPress={handleAddUser} />

      <View>
        <Text>Group Members</Text>
        {members ? (
          members.map((member) => <Text key={member}>{member}</Text>)
        ) : (
          <Text>No members</Text>
        )}
      </View>
    </View>
  );
}

// uhhhhh
const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
