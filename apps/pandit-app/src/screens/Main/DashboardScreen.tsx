import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Calendar, IndianRupee, TrendingUp, Bell, MapPin, ChevronRight, CheckCircle } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [requests, setRequests] = React.useState([
    { id: '1', service: 'Satyanarayan Katha', date: 'Tomorrow • 10:00 AM', amount: '2,100' },
    { id: '2', service: 'Griha Pravesh', date: 'Oct 25 • 09:30 AM', amount: '5,100' },
  ]);

  const handleAccept = async (id: string) => {
    // API call would go here
    // await fetch(`${API_URL}/bookings/${id}/status`, { method: 'PATCH', body: { status: 'confirmed' } })
    setRequests(prev => prev.filter(r => r.id !== id));
    alert('Booking Accepted! View it in your Schedule.');
  };

  const handleDecline = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Namaste,</Text>
          <Text style={styles.name}>Pandit Ramesh Shastri</Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Bell color={Colors.text} size={24} />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsLabel}>Current Month Earnings</Text>
              <Text style={styles.earningsValue}>₹ 45,900</Text>
            </View>
            <View style={styles.growthBadge}>
              <TrendingUp color={Colors.success} size={14} />
              <Text style={styles.growthText}>+12%</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Bookings</Text>
              <Text style={styles.statValue}>24</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rating</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.statValue}>4.9</Text>
                <Text style={styles.starText}>⭐</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.payoutButton}>
            <Text style={styles.payoutButtonText}>Request Payout</Text>
            <ChevronRight color="white" size={16} />
          </TouchableOpacity>
        </View>

        {/* Today's Bookings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Bookings</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bookingCard}>
          <View style={styles.bookingTime}>
             <Text style={styles.timeText}>09:30 AM</Text>
             <Text style={styles.durationText}>2.5 hrs</Text>
          </View>
          <View style={styles.bookingBody}>
            <Text style={styles.serviceName}>Griha Pravesh Puja</Text>
            <View style={styles.locationRow}>
               <MapPin color={Colors.textSecondary} size={14} />
               <Text style={styles.locationText} numberOfLines={1}>B2, Shanti Nilayam, Varanasi</Text>
            </View>
            <View style={styles.customerRow}>
               <View style={styles.customerAvatar}>
                  <Text style={styles.avatarText}>KM</Text>
               </View>
               <Text style={styles.customerName}>Kritagya Madaan</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.navButton}>
             <MapPin color={Colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        {/* Pending Requests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Requests ({requests.length})</Text>
        </View>

        {requests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
             <View style={styles.requestInfo}>
                <Text style={styles.requestService}>{request.service}</Text>
                <Text style={styles.requestDate}>{request.date}</Text>
                <Text style={styles.requestAmount}>₹ {request.amount}</Text>
             </View>
             <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => handleAccept(request.id)}
                >
                   <CheckCircle color="white" size={20} />
                   <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.declineButton}
                  onPress={() => handleDecline(request.id)}
                >
                   <Text style={styles.declineText}>Decline</Text>
                </TouchableOpacity>
             </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  notifButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  earningsCard: {
    backgroundColor: Colors.text,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  earningsLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  earningsValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#065F46',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  growthText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#374151',
    marginHorizontal: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    fontSize: 14,
    marginLeft: 4,
  },
  payoutButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  payoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bookingCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  bookingTime: {
    alignItems: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  durationText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  bookingBody: {
    flex: 1,
    paddingLeft: 20,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerAvatar: {
    width: 24,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  customerName: {
    fontSize: 14,
    fontWeight: 'medium',
    color: Colors.text,
  },
  navButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF7ED',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  requestInfo: {
    marginBottom: 16,
  },
  requestService: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  requestAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    flex: 2,
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  acceptText: {
    color: 'white',
    fontWeight: 'bold',
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
