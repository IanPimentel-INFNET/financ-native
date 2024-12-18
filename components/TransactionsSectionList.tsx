import { SectionList, View } from "react-native"
import { Icon, List, Text } from "react-native-paper"
import { filterOptions, transactionSectionListType } from "~/app/(tabs)";
import { Collapsible } from "./Collapsible";
// import { memo } from "react";

type Props = {
    data: transactionSectionListType,
    filters: filterOptions,
    searchQ: string
}



const TransactionsSectionList = ({ data, searchQ, filters }: Props) => {

    return (
        <SectionList
            sections={data}
            nestedScrollEnabled={true}
            // ListFooterComponent={() => {
            //     return (
            //         <Text>Footer</Text>
            //     )
            // }}
            renderItem={(item) => {
                const actionsKeys = Object.keys(item.item)
                return (
                    <List.Section>
                        <Collapsible
                            title={
                                <View>
                                    <Text>{item.section.title}</Text>
                                </View>
                            }
                        >
                            {
                                actionsKeys.map((key, _index) => {
                                    const transactions = item.item[key]
                                    return key.toLowerCase().includes(searchQ) ? (
                                        <>
                                            <List.Section title={key}
                                                titleStyle={{ fontWeight: '700' }}
                                                className="p-2">

                                                {
                                                    transactions
                                                        .map((transact) => {
                                                            // console.log('aoba')
                                                            return (
                                                                <View className="p-2">
                                                                    <Text variant="titleMedium" style={{ fontWeight: '700' }}>$ {(transact.price * transact.amount)}</Text>
                                                                    <View className="mt-1 flex-row justify-between">
                                                                        <Text variant="titleSmall">{transact.price} x {transact.amount}</Text>

                                                                        <Text variant="titleSmall">{transact.date.toLocaleDateString()}</Text>
                                                                    </View>
                                                                </View>
                                                            )
                                                        })
                                                }
                                            </List.Section>
                                        </>
                                    ) : null
                                })
                            }
                        </Collapsible>
                    </List.Section>
                )
            }}
        />
    )
}
export default TransactionsSectionList;

// export default memo(TransactionsSectionList);