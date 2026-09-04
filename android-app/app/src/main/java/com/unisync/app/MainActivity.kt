package com.unisync.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.unisync.app.ui.screens.*
import com.unisync.app.ui.theme.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            UniSyncTheme {
                var currentTab by remember { mutableStateOf(Tab.Routine) }
                
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Scaffold(
                        topBar = { TopHeaderBar(currentTab) },
                        bottomBar = { BottomNavBar(currentTab) { currentTab = it } }
                    ) { innerPadding ->
                        Box(
                            modifier = Modifier
                                .fillMaxSize()
                                .padding(innerPadding)
                                .background(MaterialTheme.colorScheme.background)
                        ) {
                            when (currentTab) {
                                Tab.Routine -> RoutineScreen()
                                Tab.Timer -> TimerScreen()
                                Tab.Alerts -> AlertsScreen()
                                Tab.Community -> CommunityScreen()
                            }
                        }
                    }
                }
            }
        }
    }
}

enum class Tab(val title: String) {
    Routine("Routine"),
    Timer("Timer"),
    Alerts("Alerts"),
    Community("Community")
}

@Composable
fun TopHeaderBar(currentTab: Tab) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .statusBarsPadding()
            .height(80.dp)
            .background(MaterialTheme.colorScheme.surface)
            .neumorphicRaised(borderRadius = 0.dp)
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // App Logo Icon with Raised shadow
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .neumorphicRaised(borderRadius = 12.dp)
                    .background(MaterialTheme.colorScheme.surface),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.School,
                    contentDescription = "Logo",
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(24.dp)
                )
            }
            
            Column {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Text(
                        text = "UniSync",
                        style = MaterialTheme.typography.titleLarge
                    )
                    // Pulse live pill
                    Box(
                        modifier = Modifier
                            .background(SecondaryContainer, RoundedCornerShape(100.dp))
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "LIVE",
                            color = Color(0xFF005236),
                            style = MaterialTheme.typography.labelSmall
                        )
                    }
                }
                Text(
                    text = currentTab.title,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
        
        // Notifications & Profile row
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = {},
                modifier = Modifier
                    .size(44.dp)
                    .neumorphicRaised(borderRadius = 22.dp)
                    .background(MaterialTheme.colorScheme.surface)
            ) {
                Icon(
                    imageVector = Icons.Default.Notifications,
                    contentDescription = "Notifications"
                )
            }
            
            // Profile image container
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .neumorphicRaised(borderRadius = 22.dp)
                    .padding(2.dp)
                    .background(Color.White),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.AccountCircle,
                    contentDescription = "Profile",
                    modifier = Modifier.fillMaxSize(),
                    tint = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

@Composable
fun BottomNavBar(activeTab: Tab, onTabSelected: (Tab) -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .navigationBarsPadding()
            .height(80.dp)
            .background(MaterialTheme.colorScheme.surface)
            .neumorphicRaised(borderRadius = 0.dp),
        horizontalArrangement = Arrangement.SpaceAround,
        verticalAlignment = Alignment.CenterVertically
    ) {
        val tabs = listOf(
            Triple(Tab.Routine, Icons.Default.DateRange, "Routine"),
            Triple(Tab.Timer, Icons.Default.HourglassEmpty, "Timer"),
            Triple(Tab.Alerts, Icons.Default.AddAlert, "Alerts"),
            Triple(Tab.Community, Icons.Default.Forum, "Community")
        )
        
        tabs.forEach { (tab, icon, label) ->
            val isActive = tab == activeTab
            
            Column(
                modifier = Modifier
                    .width(70.dp)
                    .height(60.dp)
                    .neumorphicStyle(isActive)
                    .clickable { onTabSelected(tab) },
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = if (isActive) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.size(24.dp)
                )
                Text(
                    text = label,
                    style = MaterialTheme.typography.labelSmall,
                    color = if (isActive) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }
    }
}

// Helper utility to apply correct shadow based on active state
private fun Modifier.neumorphicStyle(isActive: Boolean): Modifier {
    return if (isActive) {
        this.neumorphicSunken(borderRadius = 16.dp, depth = 4.dp)
    } else {
        this
    }
}