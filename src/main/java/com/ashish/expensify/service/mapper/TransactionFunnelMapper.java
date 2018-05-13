package com.ashish.expensify.service.mapper;

import com.ashish.expensify.domain.*;
import com.ashish.expensify.service.dto.TransactionFunnelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TransactionFunnel and its DTO TransactionFunnelDTO.
 */
@Mapper(componentModel = "spring", uses = {TransactionCategoryMapper.class})
public interface TransactionFunnelMapper extends EntityMapper<TransactionFunnelDTO, TransactionFunnel> {

    @Mapping(source = "transactionCategory.id", target = "transactionCategoryId")
    TransactionFunnelDTO toDto(TransactionFunnel transactionFunnel);

    @Mapping(source = "transactionCategoryId", target = "transactionCategory")
    TransactionFunnel toEntity(TransactionFunnelDTO transactionFunnelDTO);

    default TransactionFunnel fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransactionFunnel transactionFunnel = new TransactionFunnel();
        transactionFunnel.setId(id);
        return transactionFunnel;
    }
}
