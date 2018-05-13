package com.ashish.expensify.repository;

import com.ashish.expensify.domain.TransactionFunnel;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TransactionFunnel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionFunnelRepository extends JpaRepository<TransactionFunnel, Long> {

}
