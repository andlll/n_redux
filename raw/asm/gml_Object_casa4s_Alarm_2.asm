// gml_Object_casa4s_Alarm_2  locals=2 args=0 len=872
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 1
00000018: conv.i.v
0000001C: push.imm.e 5
00000020: conv.i.v
00000024: push.v ava
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20DF968
0000004C: push.v ava
00000054: push.imm.e 1
00000058: add.i.v
0000005C: pop.v.v ava
00000064: push.imm.e 156
00000068: pushenv 0x20DF7D0
0000006C: push.v pop
00000074: push.imm.e 37
00000078: add.i.v
0000007C: pop.v.v pop
00000084: popenv 0x40DF7B8
00000088: push.imm.e 2
0000008C: conv.i.v
00000090: call action_if_dice(argc=1)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20DF8B4
000000B0: push.imm.e 2
000000B4: conv.i.v
000000B8: call action_if_dice(argc=1)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20DF86C
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: push.imm.e 2
000000F0: conv.i.v
000000F4: push.imm.e 9000
000000F8: conv.i.v
000000FC: call action_set_alarm(argc=2)
00000104: popz
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: call action_set_relative(argc=1)
00000118: popz
0000011C: b 0x20DF8B0
00000120: push.imm.e 0
00000124: conv.i.v
00000128: call action_set_relative(argc=1)
00000130: popz
00000134: push.imm.e 2
00000138: conv.i.v
0000013C: push.imm.e 13231
00000140: conv.i.v
00000144: call action_set_alarm(argc=2)
0000014C: popz
00000150: push.imm.e 1
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz
00000164: b 0x20DF968
00000168: push.imm.e 2
0000016C: conv.i.v
00000170: call action_if_dice(argc=1)
00000178: pop.v.v local.__b__
00000180: push.local.v local.__b__
00000188: conv.v.b
0000018C: bf 0x20DF924
00000190: push.imm.e 0
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.imm.e 2
000001A8: conv.i.v
000001AC: push.imm.e 15846
000001B0: conv.i.v
000001B4: call action_set_alarm(argc=2)
000001BC: popz
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: call action_set_relative(argc=1)
000001D0: popz
000001D4: b 0x20DF968
000001D8: push.imm.e 0
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.imm.e 2
000001F0: conv.i.v
000001F4: push.imm.e 9912
000001F8: conv.i.v
000001FC: call action_set_alarm(argc=2)
00000204: popz
00000208: push.imm.e 1
0000020C: conv.i.v
00000210: call action_set_relative(argc=1)
00000218: popz
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.imm.e 5
00000228: conv.i.v
0000022C: push.v ava
00000234: call action_if_variable(argc=3)
0000023C: pop.v.v local.__b__
00000244: push.local.v local.__b__
0000024C: conv.v.b
00000250: bf 0x20DFAA0
00000254: push.imm.e 154
00000258: pushenv 0x20DF9E4
0000025C: push.imm.e 4
00000260: conv.i.v
00000264: push.imm.e 3
00000268: conv.i.v
0000026C: push.v level
00000274: call action_if_variable(argc=3)
0000027C: pop.v.v local.__b__
00000284: push.local.v local.__b__
0000028C: conv.v.b
00000290: bf 0x20DF9E4
00000294: b 0x20DF9EC
00000298: popenv 0x40DF9A8
0000029C: b 0x20DF9F0
000002A0: popenv 0x1CDF9EC
000002A4: push.local.v local.__b__
000002AC: conv.v.b
000002B0: bf 0x20DFA5C
000002B4: push.imm.e 0
000002B8: conv.i.v
000002BC: push.imm.e 0
000002C0: conv.i.v
000002C4: push.imm.e 225
000002C8: conv.i.v
000002CC: call action_create_object(argc=3)
000002D4: popz
000002D8: push.imm.e 0
000002DC: conv.i.v
000002E0: call action_set_relative(argc=1)
000002E8: popz
000002EC: push.imm.e 6
000002F0: pop.v.i ava
000002F8: push.imm.e 1
000002FC: conv.i.v
00000300: call action_set_relative(argc=1)
00000308: popz
0000030C: b 0x20DFAA0
00000310: push.imm.e 0
00000314: conv.i.v
00000318: call action_set_relative(argc=1)
00000320: popz
00000324: push.imm.e 2
00000328: conv.i.v
0000032C: push.imm.e 600
00000330: conv.i.v
00000334: call action_set_alarm(argc=2)
0000033C: popz
00000340: push.imm.e 1
00000344: conv.i.v
00000348: call action_set_relative(argc=1)
00000350: popz
00000354: push.imm.e 0
00000358: conv.i.v
0000035C: call action_set_relative(argc=1)
00000364: popz