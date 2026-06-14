import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { IndianRupee, ArrowUpRight, ArrowDownLeft, Filter, Download } from 'lucide-react-native';
import { Colors } from '../../theme/colors';

const EarningsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Download color={Colors.primary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Total Earnings Summary */}
        <View style={styles.summaryCard}>
           <Text style={styles.summaryLabel}>Total Lifetime Earnings</Text>
           <Text style={styles.summaryValue}>₹ 2,84,500</Text>
           <View style={styles.summaryFooter}>
              <View style={styles.summaryItem}>
                 <Text style={styles.itemLabel}>Available for Payout</Text>
                 <Text style={styles.itemValue}>₹ 12,400</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                 <Text style={styles.itemLabel}>Pending Clearances</Text>
                 <Text style={styles.itemValue}>₹ 4,200</Text>
              </View>
           </View>
        </View>

        {/* Transactions List */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Recent Transactions</Text>
           <TouchableOpacity style={styles.filterButton}>
              <Filter color={Colors.textSecondary} size={18} />
              <Text style={styles.filterText}>Filter</Text>
           </TouchableOpacity>
        </View>

        {[
          { title: 'Griha Pravesh - Kritagya', date: 'Today, 11:30 AM', amount: '+ ₹2,100', type: 'credit' },
          { title: 'Commission Deduction', date: 'Today, 11:30 AM', amount: '- ₹210', type: 'debit' },
          { title: 'Payout to Bank (HDFC)', date: 'Yesterday, 04:00 PM', amount: '- ₹8,000', type: 'debit' },
          { title: 'Satyanarayan Katha - Rahul', date: '22 Oct, 10:00 AM', amount: '+ ₹3,100', type: 'credit' },
          { title: 'Marriage Puja - Sharma Ji', date: '20 Oct, 09:00 AM', amount: '+ ₹15,000', type: 'credit' },
        ].map((item, i) => (
          <View key={i} style={styles.transactionItem}>
             <View style={[styles.iconContainer, item.type === 'credit' ? styles.creditIcon : styles.debitIcon]}>
                {item.type === 'credit' ? (
                  <ArrowUpRight color={Colors.success} size={20} />
                ) : (
                  <ArrowDownLeft color={Colors.error} size={20} />
                )}
             </View>
             <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
             </View>
             <Text style={[styles.itemAmount, item.type === 'credit' ? styles.creditText : styles.debitText]}>
                {item.amount}
             </Text>
          </View>
        ))}
      </ScrollView>

      {/* Payout CTA */}
      <View style={styles.ctaContainer}>
         <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>Withdraw Earnings</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  downloadButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF7ED',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  summaryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 16,
  },
  summaryItem: {
    flex: 1,
  },
  itemLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  itemValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  filterText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditIcon: {
    backgroundColor: '#ECFDF5',
  },
  debitIcon: {
    backgroundColor: '#FEF2F2',
  },
  itemBody: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditText: {
    color: Colors.success,
  },
  debitText: {
    color: Colors.error,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  ctaButton: {
    backgroundColor: Colors.text,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EarningsScreen;
