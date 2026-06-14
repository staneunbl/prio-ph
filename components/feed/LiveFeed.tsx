import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

type FeedItem = {
  id: string;
  title: string;
  message: string;
  type?: 'alert' | 'info' | 'warning';
  time?: string;
  images?: string[];
};

type Props = {
  data: FeedItem[];
};

const TYPE_CONFIG = {
  alert: {
    icon: 'alert-circle' as const,
    color: '#E24B4A',
    bg: 'rgba(226, 75, 74, 0.12)',
    label: 'Alert',
  },
  warning: {
    icon: 'warning' as const,
    color: '#FFD84D',
    bg: 'rgba(255, 216, 77, 0.12)',
    label: 'Warning',
  },
  info: {
    icon: 'information-circle' as const,
    color: '#4ADE80',
    bg: 'rgba(74, 222, 128, 0.12)',
    label: 'Update',
  },
};

export default function LiveFeed({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        const config = TYPE_CONFIG[item.type ?? 'info'];

        return (
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
                  <Ionicons name={config.icon} size={18} color={config.color} />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={[styles.typeLabel, { color: config.color }]}>
                    {config.label}
                  </Text>
                </View>
              </View>
              {item.time && <Text style={styles.time}>{item.time}</Text>}
            </View>

            <Text style={styles.message}>{item.message}</Text>

            {item.images && item.images.length > 0 && (
              <View style={styles.imageRow}>
                {item.images.slice(0, 2).map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    style={[
                      styles.image,
                      item.images!.length === 1 && styles.imageFull,
                    ]}
                    resizeMode="cover"
                  />
                ))}
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    gap: 12,
  },

  card: {
    backgroundColor: 'rgba(31, 61, 34, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(31, 61, 34, 0.08)',
    padding: 14,
    borderRadius: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },

  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F3D22',
  },

  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  time: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.4)',
    marginLeft: 8,
  },

  message: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)',
    lineHeight: 18,
  },

  imageRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  image: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },

  imageFull: {
    height: 140,
  },
});