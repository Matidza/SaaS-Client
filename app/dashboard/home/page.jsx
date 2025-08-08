"use client"

import React from 'react';
import { Box, Button, Flex, Grid, Heading, Text, VStack, HStack, Tag } from '@chakra-ui/react';

export default function InterviewPrepLayout() {
  const professionals = [
    {
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer at Google',
      rating: '4.9 (127 reviews)',
      tags: ['Software Engineering', 'System Design'],
      tagColors: ['blue', 'green'],
      price: '$45/hour',
    },
    {
      name: 'Mike Chen',
      title: 'Investment Banking VP at Goldman Sachs',
      rating: '4.8 (89 reviews)',
      tags: ['Investment Banking', 'Finance'],
      tagColors: ['pink', 'yellow'],
      price: '$60/hour',
    },
    {
      name: 'Alex Rodriguez',
      title: 'Marketing Director at Netflix',
      rating: '4.7 (56 reviews)',
      tags: ['Marketing', 'Strategy'],
      tagColors: ['red', 'green'],
      price: '$50/hour',
    },
    {
      name: 'Emma Williams',
      title: 'Senior Consultant at McKinsey & Company',
      rating: '4.9 (143 reviews)',
      tags: ['Consulting', 'Case Studies'],
      tagColors: ['green', 'blue'],
      price: '$70/hour',
    },
    {
      name: 'David Kim',
      title: 'Product Manager at Meta',
      rating: '4.8 (92 reviews)',
      tags: ['Product Management', 'UX Design'],
      tagColors: ['purple', 'pink'],
      price: '$55/hour',
    },
    {
      name: 'Lisa Thompson',
      title: 'Data Scientist at Microsoft',
      rating: '4.9 (78 reviews)',
      tags: ['Data Science', 'Analytics'],
      tagColors: ['blue', 'yellow'],
      price: '$50/hour',
    },
  ];

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <Flex justify="space-between" align="center" py={4} borderBottom="1px" borderColor="gray.200">
        <Heading size="lg" color="blue.600">InterviewPrep</Heading>
        <HStack spacing={4}>
          <Button variant="outline">Sign In</Button>
          <Button colorScheme="blue">Join as Professional</Button>
        </HStack>
      </Flex>

      <VStack spacing={6} textAlign="center" my={12}>
        <Heading size="2xl">Practice Interviews with Industry Professionals</Heading>
        <Text fontSize="lg" color="gray.600">
          Connect with experienced professionals for personalized mock interviews and career guidance
        </Text>
        <HStack spacing={4}>
          <Button colorScheme="blue">Find Professionals</Button>
          <Button variant="outline">How it Works</Button>
        </HStack>
      </VStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={16} textAlign="center">
        {[
          { icon: '👤', title: 'Choose Your Professional', desc: 'Browse profiles and select an expert in your field' },
          { icon: '📅', title: 'Schedule Your Session', desc: 'Book a convenient time for your mock interview' },
          { icon: '🎥', title: 'Practice via Zoom', desc: 'Get real-time feedback and improve your skills' },
        ].map((item, idx) => (
          <Box key={idx} p={6} borderWidth={1} borderRadius="xl" _hover={{ shadow: 'lg' }}>
            <Text fontSize="3xl" mb={2}>{item.icon}</Text>
            <Heading size="md" mb={2}>{item.title}</Heading>
            <Text>{item.desc}</Text>
          </Box>
        ))}
      </Grid>

      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Top Professionals</Heading>
        <Button variant="outline">More Filters</Button>
      </Flex>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {professionals.map((pro, index) => (
          <Box key={index} borderWidth={1} p={4} borderRadius="xl" _hover={{ shadow: 'lg' }}>
            <VStack align="start" spacing={3}>
              <Heading size="md">{pro.name}</Heading>
              <Text color="gray.600">{pro.title}</Text>
              <Text color="yellow.500" fontWeight="medium">{pro.rating}</Text>
              <HStack spacing={2} flexWrap="wrap">
                {pro.tags.map((tag, i) => (
                  <Tag key={i} colorScheme={pro.tagColors[i]}>{tag}</Tag>
                ))}
              </HStack>
              <Text fontWeight="bold">{pro.price}</Text>
              <Button colorScheme="blue" w="full">Book Session</Button>
            </VStack>
          </Box>
        ))}
      </Grid>

      <Flex justify="center" mt={8}>
        <Button variant="outline">View All Professionals</Button>
      </Flex>
    </Box>
  );
}
