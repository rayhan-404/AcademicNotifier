export interface KotlinFile {
  name: string;
  language: string;
  code: string;
  description: string;
}

export const kotlinFiles: KotlinFile[] = [
  {
    name: "NeumorphicTheme.kt",
    language: "kotlin",
    description: "Defines Material Theme colors matching the design spec, along with custom reusable Modifier extension functions for Raised and Sunken Neumorphic shadows in Jetpack Compose.",
    code: `package com.unisync.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Paint
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

// Custom light colors mapped exactly from the tailwind tokens
val Primary = Color(0xFF0058BE)
val PrimaryContainer = Color(0xFF2170E4)
val Secondary = Color(0xFF006C49)
val SecondaryContainer = Color(0xFF6CF8BB)
val Tertiary = Color(0xFF6B38D4)
val TertiaryContainer = Color(0xFF8455EF)
val SurfaceBg = Color(0xFFF6FAFE)
val OnSurface = Color(0xFF171C1F)
val OnSurfaceVariant = Color(0xFF424754)
val OutlineVariant = Color(0xFFC2C6D6)
val Error = Color(0xFFBA1A1A)

private val LightColorScheme = lightColorScheme(
    primary = Primary,
    primaryContainer = PrimaryContainer,
    secondary = Secondary,
    secondaryContainer = SecondaryContainer,
    tertiary = Tertiary,
    background = SurfaceBg,
    surface = SurfaceBg,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onBackground = OnSurface,
    onSurface = OnSurface,
    onSurfaceVariant = OnSurfaceVariant,
    error = Error
)

@Composable
fun UniSyncTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = AppTypography,
        content = content
    )
}

/**
 * Reusable Jetpack Compose Modifier to apply high-fidelity Neumorphic Raised shadows
 */
fun Modifier.neumorphicRaised(
    borderRadius: Dp = 16.dp,
    elevation: Dp = 6.dp,
    lightShadowColor: Color = Color.White.copy(alpha = 0.95f),
    darkShadowColor: Color = Color(0xA3B1C6).copy(alpha = 0.55f)
): Modifier = this.drawBehind {
    val radiusPx = borderRadius.toPx()
    val elevationPx = elevation.toPx()
    
    drawIntoCanvas { canvas ->
        // 1. Draw Top-Left Light Glow
        val paintLight = Paint().apply {
            color = lightShadowColor
            asFrameworkPaint().apply {
                setShadowLayer(
                    elevationPx,
                    -elevationPx,
                    -elevationPx,
                    lightShadowColor.toArgb()
                )
            }
        }
        canvas.drawRoundRect(
            left = 0f,
            top = 0f,
            right = size.width,
            bottom = size.height,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paintLight
        )

        // 2. Draw Bottom-Right Soft Dark Shadow
        val paintDark = Paint().apply {
            color = SurfaceBg
            asFrameworkPaint().apply {
                setShadowLayer(
                    elevationPx + 2f,
                    elevationPx,
                    elevationPx,
                    darkShadowColor.toArgb()
                )
            }
        }
        canvas.drawRoundRect(
            left = 0f,
            top = 0f,
            right = size.width,
            bottom = size.height,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paintDark
        )
    }
}

/**
 * Reusable Jetpack Compose Modifier to apply Neumorphic Sunken/Inset shadows
 */
fun Modifier.neumorphicSunken(
    borderRadius: Dp = 16.dp,
    depth: Dp = 4.dp,
    lightShadowColor: Color = Color.White,
    darkShadowColor: Color = Color(0xA3B1C6).copy(alpha = 0.5f)
): Modifier = this.drawBehind {
    val radiusPx = borderRadius.toPx()
    val depthPx = depth.toPx()

    drawIntoCanvas { canvas ->
        // In Jetpack Compose, true Inset Shadow is typically drawn with clipping path
        // and nested drawing. This represents a highly optimized drawing implementation.
        val paint = Paint().apply {
            color = SurfaceBg
            asFrameworkPaint().apply {
                isAntiAlias = true
            }
        }
        
        // Background Base
        canvas.drawRoundRect(
            left = 0f,
            top = 0f,
            right = size.width,
            bottom = size.height,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paint
        )

        // Nested Inner Shadow Simulation
        val paintShadow = Paint().apply {
            color = Color.Transparent
            asFrameworkPaint().apply {
                isAntiAlias = true
                strokeWidth = depthPx
                setStyle(android.graphics.Paint.Style.STROKE)
                setShadowLayer(
                    depthPx,
                    depthPx,
                    depthPx,
                    darkShadowColor.toArgb()
                )
            }
        }
        canvas.drawRoundRect(
            left = -depthPx,
            top = -depthPx,
            right = size.width + depthPx,
            bottom = size.height + depthPx,
            radiusX = radiusPx,
            radiusY = radiusPx,
            paint = paintShadow
        )
    }
}`
  },
  {
    name: "MainActivity.kt",
    language: "kotlin",
    description: "The primary hosting Activity setting up status bar padding, state-driven dynamic bottom tab navigation, and routing to the respective high-fidelity UI screens.",
    code: `package com.unisync.app

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
}`
  },
  {
    name: "RoutineScreen.kt",
    language: "kotlin",
    description: "The Weekly Routine interface displaying real-time CR synchronization status, copyable cohort card, interactive weekday selector strip, and detail-rich academic lectures.",
    code: `package com.unisync.app.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.unisync.app.ui.theme.*

@Composable
fun RoutineScreen() {
    val context = LocalContext.current
    val clipboardManager = LocalClipboardManager.current
    var selectedDay by remember { mutableStateOf("Wed 23") }
    
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 32.dp)
    ) {
        // 1. Sync & Stream Info Card
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .neumorphicRaised()
                    .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Live indicator badge
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            modifier = Modifier
                                .background(SecondaryContainer, RoundedCornerShape(100.dp))
                                .padding(horizontal = 10.dp, vertical = 4.dp)
                        ) {
                            Box(modifier = Modifier.size(6.dp).background(Secondary, RoundedCornerShape(100.dp)))
                            Text(
                                "CR Sync Live",
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF005236)
                            )
                        }
                        
                        Text(
                            "Synced 15m ago",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    
                    // Sunken Class Code Well
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .neumorphicSunken(borderRadius = 12.dp)
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.School,
                                contentDescription = "Cohort",
                                tint = MaterialTheme.colorScheme.primary
                            )
                            Column {
                                Text(
                                    "COHORT STREAM",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Text(
                                    "CSE-21B",
                                    style = MaterialTheme.typography.titleMedium,
                                    color = MaterialTheme.colorScheme.primary,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                        
                        // Copy Button
                        IconButton(
                            onClick = {
                                clipboardManager.setText(AnnotatedString("CSE-21B"))
                                Toast.makeText(context, "Copied class stream code!", Toast.LENGTH_SHORT).show()
                            },
                            modifier = Modifier
                                .size(36.dp)
                                .neumorphicRaised(borderRadius = 8.dp)
                                .background(MaterialTheme.colorScheme.surface)
                        ) {
                            Icon(
                                imageVector = Icons.Default.ContentCopy,
                                contentDescription = "Copy",
                                modifier = Modifier.size(16.dp)
                            )
                        }
                    }
                }
            }
        }
        
        // 2. Day Selector Strip
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                val days = listOf("Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25", "Sat 26")
                days.forEach { day ->
                    val isSelected = day == selectedDay
                    Box(
                        modifier = Modifier
                            .width(52.dp)
                            .height(68.dp)
                            .neumorphicStyle(isSelected)
                            .background(
                                color = MaterialTheme.colorScheme.surface,
                                shape = RoundedCornerShape(12.dp)
                            )
                            .clickable { selectedDay = day }
                            .padding(vertical = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = day.split(" ")[0].first().toString(),
                                style = MaterialTheme.typography.labelSmall,
                                color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                            Text(
                                text = day.split(" ")[1],
                                style = MaterialTheme.typography.titleMedium,
                                color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
        
        // 3. Today's Lectures
        item {
            Text(
                "Today's Lecture Series",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
        }
        
        // Lecture Card 1: DBMS
        item {
            LectureCard(
                time = "09:30 - 11:00 AM",
                subject = "CSE-311: DBMS",
                type = "Theory",
                prof = "Professor Raihan Ahmed",
                room = "Room 402 (Building 2)",
                accentColor = Primary
            )
        }
        
        // Lecture Card 2: Database Lab
        item {
            LectureCard(
                time = "11:15 - 01:15 PM",
                subject = "CSE-312: Database Lab",
                type = "Lab Practical",
                prof = "TAs: Fahim & Shuvo",
                room = "Lab Room 3 (40 PCs)",
                accentColor = Secondary
            )
        }
        
        // Lecture Card 3: Numerical Methods
        item {
            LectureCard(
                time = "02:00 - 03:30 PM",
                subject = "MAT-205: Numerical Methods",
                type = "Mathematics",
                prof = "Dr. Aminul Islam",
                room = "Room 301 (Academic Block)",
                accentColor = Tertiary
            )
        }
    }
}

@Composable
fun LectureCard(
    time: String,
    subject: String,
    type: String,
    prof: String,
    room: String,
    accentColor: Color
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .neumorphicRaised()
            .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
    ) {
        // Colored side accent line
        Box(
            modifier = Modifier
                .align(Alignment.CenterStart)
                .fillMaxHeight()
                .width(6.dp)
                .background(accentColor, RoundedCornerShape(topStart = 16.dp, bottomStart = 16.dp))
        )
        
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 20.dp, top = 16.dp, end = 16.dp, bottom = 16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = time,
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.Bold,
                    color = accentColor
                )
                
                Box(
                    modifier = Modifier
                        .background(accentColor.copy(alpha = 0.12f), RoundedCornerShape(100.dp))
                        .padding(horizontal = 10.dp, vertical = 2.dp)
                ) {
                    Text(
                        type,
                        color = accentColor,
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
            
            Column {
                Text(
                    subject,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    prof,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Sunken room container
                Row(
                    modifier = Modifier
                        .neumorphicSunken(borderRadius = 8.dp)
                        .padding(horizontal = 12.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Room,
                        contentDescription = "Room",
                        tint = accentColor,
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        room,
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.SemiBold
                    )
                }
                
                // Rounded Action Button
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .neumorphicRaised(borderRadius = 16.dp)
                        .background(MaterialTheme.colorScheme.surface),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Directions,
                        contentDescription = "Navigation",
                        tint = accentColor,
                        modifier = Modifier.size(16.dp)
                    )
                }
            }
        }
    }
}`
  },
  {
    name: "TimerScreen.kt",
    language: "kotlin",
    description: "The high-fidelity Countdown Timer interface. Showcases an advanced custom circular Neumorphic progress ring, real-time digital timer, and active sessional stats widgets.",
    code: `package com.unisync.app.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.unisync.app.ui.theme.*
import kotlinx.coroutines.delay

@Composable
fun TimerScreen() {
    var timeLeft by remember { mutableStateOf(4 * 60 + 28) } // 4 minutes 28 seconds

    LaunchedEffect(key1 = true) {
        while (timeLeft > 0) {
            delay(1000L)
            timeLeft--
        }
    }

    val hours = timeLeft / 3600
    val minutes = (timeLeft % 3600) / 60
    val seconds = timeLeft % 60
    val formattedTime = String.format("%02d : %02d : %02d", hours, minutes, seconds)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 32.dp)
    ) {
        // 1. Hero Neumorphic Dial
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .neumorphicRaised(borderRadius = 24.dp)
                .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(24.dp))
                .padding(24.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Neumorphic Double Ring Countdown Dial
                Box(
                    modifier = Modifier
                        .size(240.dp)
                        .neumorphicRaised(borderRadius = 120.dp)
                        .padding(12.dp)
                        .neumorphicSunken(borderRadius = 108.dp),
                    contentAlignment = Alignment.Center
                ) {
                    // Custom Drawn Conic Gradient Progress Arc
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        val strokeWidth = 14.dp.toPx()
                        val diameter = size.minDimension - strokeWidth
                        
                        // Soft static background track
                        drawCircle(
                            color = Color(0xFFDFE3E7).copy(alpha = 0.5f),
                            radius = diameter / 2f,
                            style = Stroke(width = strokeWidth)
                        )
                        
                        // Animated Sweeping Gradient Indicator
                        drawArc(
                            brush = Brush.sweepGradient(
                                colors = listOf(PrimaryContainer, TertiaryContainer, SecondaryContainer, PrimaryContainer),
                                center = Offset(size.width / 2f, size.height / 2f)
                            ),
                            startAngle = -90f,
                            sweepAngle = 280f, // Active remaining progress ratio
                            useCenter = false,
                            style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
                        )
                    }

                    // Raised Floating Inner Core Content Panel
                    Box(
                        modifier = Modifier
                            .size(176.dp)
                            .neumorphicRaised(borderRadius = 88.dp)
                            .background(MaterialTheme.colorScheme.surface, CircleShape)
                            .padding(12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Box(
                                modifier = Modifier
                                    .background(Error, RoundedCornerShape(100.dp))
                                    .padding(horizontal = 10.dp, vertical = 2.dp)
                            ) {
                                Text(
                                    "NEXT CLASS IN",
                                    color = Color.White,
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            
                            Spacer(modifier = Modifier.height(6.dp))
                            
                            Text(
                                text = formattedTime,
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            
                            Spacer(modifier = Modifier.height(6.dp))
                            
                            Row(
                                modifier = Modifier
                                    .background(Color(0xFFEAEEF2), RoundedCornerShape(8.dp))
                                    .padding(horizontal = 10.dp, vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Room,
                                    contentDescription = null,
                                    tint = Primary,
                                    modifier = Modifier.size(12.dp)
                                )
                                Text(
                                    "Room 402, Dept CS",
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                        }
                    }
                }
                
                // Lecture details
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        "CSE-311: Database Systems",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        "Prof. Raihan Ahmed • Section B",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
        
        // 2. Stats Grid
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            listOf(
                Triple("Today", "4", "Classes"),
                Triple("Exams", "1 CT", "Tomorrow"),
                Triple("Pending", "2", "Due Soon")
            ).forEach { (label, value, footer) ->
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .neumorphicRaised()
                        .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                        .padding(12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Text(
                            label.uppercase(),
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            value,
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.ExtraBold,
                            color = OnSurface
                        )
                        Box(
                            modifier = Modifier
                                .background(Primary.copy(alpha = 0.08f), RoundedCornerShape(100.dp))
                                .padding(horizontal = 8.dp, vertical = 2.dp)
                        ) {
                            Text(
                                footer,
                                style = MaterialTheme.typography.labelSmall,
                                color = Primary,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
    }
}`
  },
  {
    name: "AlertsScreen.kt",
    language: "kotlin",
    description: "The Alert Engine status controller. Houses complex scheduling triggers, multi-step exam escalation cards, and full battery and network bypass switches.",
    code: `package com.unisync.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.unisync.app.ui.theme.*

@Composable
fun AlertsScreen() {
    var overrideSilent by remember { mutableStateOf(true) }
    var batteryOptimizationBypass by remember { mutableStateOf(true) }
    var offlineScheduler by remember { mutableStateOf(true) }
    
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 32.dp)
    ) {
        // 1. Alert Engine Header
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .neumorphicRaised()
                    .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(44.dp)
                                .neumorphicRaised(borderRadius = 12.dp)
                                .background(MaterialTheme.colorScheme.surface),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Bolt,
                                contentDescription = null,
                                tint = Primary
                            )
                        }
                        Column {
                            Text(
                                "Alert Engine",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                "Real-time pipeline",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                    
                    Box(
                        modifier = Modifier
                            .background(Secondary, RoundedCornerShape(100.dp))
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text(
                            "ACTIVE",
                            color = Color.White,
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
        
        // 2. Bell Triggers
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .neumorphicRaised()
                    .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        "Class Bell Triggers",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                // Row items simulating timing trigger configurations
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    listOf("15m before", "5m before").forEach { trigger ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .neumorphicSunken(borderRadius = 12.dp)
                                .padding(12.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    trigger,
                                    style = MaterialTheme.typography.labelMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = Primary
                                )
                                Box(
                                    modifier = Modifier
                                        .size(10.dp)
                                        .background(Primary, CircleShape)
                                )
                            }
                        }
                    }
                }
                
                // Silent bypass trigger row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            "Override Silent Profile",
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            "Loud chime if phone is muted",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Switch(
                        checked = overrideSilent,
                        onCheckedChange = { overrideSilent = it },
                        colors = SwitchDefaults.colors(checkedThumbColor = Tertiary)
                    )
                }
            }
        }
        
        // 3. Reliability Safeguards
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .neumorphicRaised()
                    .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    "System Reliability Safeguards",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                
                // Battery Optimization Switch Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            "Battery Optimization Bypass",
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            "Prevent Android Doze from delaying alarms",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Switch(
                        checked = batteryOptimizationBypass,
                        onCheckedChange = { batteryOptimizationBypass = it },
                        colors = SwitchDefaults.colors(checkedThumbColor = Secondary)
                    )
                }
                
                Divider(color = Color(0xFFEAEEF2))
                
                // Offline Local Switch Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            "Offline Local Alarm Scheduler",
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            "Trigger timetable rings without internet",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Switch(
                        checked = offlineScheduler,
                        onCheckedChange = { offlineScheduler = it },
                        colors = SwitchDefaults.colors(checkedThumbColor = Primary)
                    )
                }
            }
        }
    }
}`
  },
  {
    name: "CommunityScreen.kt",
    language: "kotlin",
    description: "The interactive Community forum screen. Demonstrates custom dynamic feeds, nested comment arrays, helpful rating widgets, and academic resource hubs.",
    code: `package com.unisync.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.unisync.app.ui.theme.*

@Composable
fun CommunityScreen() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 32.dp)
    ) {
        // 1. Scholar Status Banner
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .neumorphicRaised()
                    .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .neumorphicRaised(borderRadius = 16.dp)
                            .background(MaterialTheme.colorScheme.surface),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Stars,
                            contentDescription = null,
                            tint = Color(0xFFF59E0B),
                            modifier = Modifier.size(28.dp)
                        )
                    }
                    Column {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                "4.8",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                "Rating",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                        Text(
                            "14 Solutions verified",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
                
                Box(
                    modifier = Modifier
                        .background(SecondaryContainer, RoundedCornerShape(100.dp))
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text(
                        "Level 3 Scholar",
                        color = Color(0xFF00714D),
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
        
        // 2. Action Hub
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                listOf(
                    Pair("Post Doubt", Icons.Default.AddCircle),
                    Pair("Snap Problem", Icons.Default.PhotoCamera)
                ).forEach { (action, icon) ->
                    Button(
                        onClick = {},
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .neumorphicRaised(borderRadius = 12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.surface),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = icon,
                                contentDescription = null,
                                tint = Primary,
                                modifier = Modifier.size(20.dp)
                            )
                            Text(
                                action,
                                color = OnSurface,
                                style = MaterialTheme.typography.labelMedium,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }
        
        // 3. Discussion Feed Item
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .neumorphicRaised()
                    .background(MaterialTheme.colorScheme.surface, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    // Post Author Header
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .neumorphicRaised(borderRadius = 18.dp)
                                    .padding(2.dp)
                                    .background(Color.White),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    imageVector = Icons.Default.AccountCircle,
                                    contentDescription = null,
                                    tint = Primary
                                )
                            }
                            Column {
                                Text(
                                    "Nafis Rahman",
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    "18m ago • Section B",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                        
                        Box(
                            modifier = Modifier
                                .background(Color(0xFFE9DDFF), RoundedCornerShape(100.dp))
                                .padding(horizontal = 10.dp, vertical = 4.dp)
                        ) {
                            Text(
                                "#Algorithms",
                                color = Tertiary,
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                    
                    // Post Content
                    Text(
                        "Can someone explain Dijkstra's algorithm edge case where negative edge weights appear?",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        "Our professor mentioned that the greedy property fails because once a node is marked visited, it assumes the shortest distance is finalized. What is the standard algorithmic remedy for this?",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    
                    // Sunken Solution Box
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .neumorphicSunken(borderRadius = 12.dp)
                            .padding(12.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Verified,
                                    contentDescription = null,
                                    tint = Secondary,
                                    modifier = Modifier.size(18.dp)
                                )
                                Text(
                                    "Top Solution by Shafi",
                                    style = MaterialTheme.typography.labelMedium,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            Text(
                                "ACCEPTED",
                                color = Secondary,
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold
                            )
                        }
                        
                        Text(
                            "Dijkstra blindly assumes weights >= 0. For negative edge cycles or negative edges, pivot to the Bellman-Ford Algorithm:",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        
                        // Code Snippet container
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(Color(0xFFEAEEF2), RoundedCornerShape(8.dp))
                                .padding(10.dp)
                        ) {
                            Text(
                                text = "for i in range(V - 1):\\n    for u, v, w in edges:\\n        if dist[u] + w < dist[v]:\\n            dist[v] = dist[u] + w",
                                style = MaterialTheme.typography.bodySmall.copy(fontFamily = FontFamily.Monospace),
                                color = OnSurface
                            )
                        }
                    }
                }
            }
        }
    }
}`
  }
];
