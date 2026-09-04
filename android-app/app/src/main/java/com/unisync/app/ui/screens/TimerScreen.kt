package com.unisync.app.ui.screens

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
}