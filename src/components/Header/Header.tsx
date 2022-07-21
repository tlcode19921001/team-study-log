import React, { useState } from 'react';
import { getOrganizationList } from '../../api/organization';
import { Organization } from '../../api/types';
import Dropdown from '../shared/Dropdown';
import Input from '../shared/Input';
import NavigationBar from '../shared/NavigationBar';
import formatOrganization from './Header.helper';

type Item = { key: string | number; value: React.ReactNode };

const Header = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const items = organizations.map<Item>((organization) => ({
    key: organization.id,
    value: organization.name,
  }));

  const getOrganizations = async (query: string) => {
    if (!query) return;

    try {
      const data = await getOrganizationList(query);
      setOrganizations(formatOrganization(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const value = e.target.value.trim();

    if (!value) {
      setOrganizations([]);
      return;
    }

    await getOrganizations(value);
  };

  return (
    <NavigationBar
      left={<div>Team Study Log</div>}
      right={
        <Dropdown
          items={items}
          trigger={
            <Input
              placeholder="Search in Group"
              value={inputValue}
              onChange={handleChange}
            />
          }
        />
      }
    />
  );
};

export default Header;
