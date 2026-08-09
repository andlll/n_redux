// gml_Object_industria1_Alarm_3  locals=2 args=0 len=804
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 20
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 0
00000034: conv.i.v
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.v arp
00000048: call action_if_variable(argc=3)
00000050: pop.v.v local.__b__
00000058: push.local.v local.__b__
00000060: conv.v.b
00000064: bf 0x20E80CC
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v deming
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x20E80CC
000000A0: push.imm.e 156
000000A4: pushenv 0x20E7EA0
000000A8: push.imm.e 2
000000AC: conv.i.v
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.v oil
000000C0: call action_if_variable(argc=3)
000000C8: pop.v.v local.__b__
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x20E7EA0
000000E0: b 0x20E7EA8
000000E4: popenv 0x40E7E64
000000E8: b 0x20E7EAC
000000EC: popenv 0x1CE7EA8
000000F0: push.local.v local.__b__
000000F8: conv.v.b
000000FC: bf 0x20E80CC
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.v xi
00000118: call action_if_variable(argc=3)
00000120: pop.v.v local.__b__
00000128: push.local.v local.__b__
00000130: conv.v.b
00000134: bf 0x20E7F40
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz
0000014C: push.imm.e -110
00000150: conv.i.v
00000154: push.imm.e -19
00000158: conv.i.v
0000015C: push.imm.e 705
00000160: conv.i.v
00000164: call action_create_object(argc=3)
0000016C: popz
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 2
00000190: conv.i.v
00000194: push.v xi
0000019C: call action_if_variable(argc=3)
000001A4: pop.v.v local.__b__
000001AC: push.local.v local.__b__
000001B4: conv.v.b
000001B8: bf 0x20E7FC4
000001BC: push.imm.e 1
000001C0: conv.i.v
000001C4: call action_set_relative(argc=1)
000001CC: popz
000001D0: push.imm.e -150
000001D4: conv.i.v
000001D8: push.imm.e -53
000001DC: conv.i.v
000001E0: push.imm.e 705
000001E4: conv.i.v
000001E8: call action_create_object(argc=3)
000001F0: popz
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: call action_set_relative(argc=1)
00000204: popz
00000208: push.imm.e 0
0000020C: conv.i.v
00000210: push.imm.e 3
00000214: conv.i.v
00000218: push.v xi
00000220: call action_if_variable(argc=3)
00000228: pop.v.v local.__b__
00000230: push.local.v local.__b__
00000238: conv.v.b
0000023C: bf 0x20E8048
00000240: push.imm.e 1
00000244: conv.i.v
00000248: call action_set_relative(argc=1)
00000250: popz
00000254: push.imm.e -170
00000258: conv.i.v
0000025C: push.imm.e 20
00000260: conv.i.v
00000264: push.imm.e 705
00000268: conv.i.v
0000026C: call action_create_object(argc=3)
00000274: popz
00000278: push.imm.e 0
0000027C: conv.i.v
00000280: call action_set_relative(argc=1)
00000288: popz
0000028C: push.imm.e 0
00000290: conv.i.v
00000294: push.imm.e 4
00000298: conv.i.v
0000029C: push.v xi
000002A4: call action_if_variable(argc=3)
000002AC: pop.v.v local.__b__
000002B4: push.local.v local.__b__
000002BC: conv.v.b
000002C0: bf 0x20E80CC
000002C4: push.imm.e 1
000002C8: conv.i.v
000002CC: call action_set_relative(argc=1)
000002D4: popz
000002D8: push.imm.e -127
000002DC: conv.i.v
000002E0: push.imm.e 55
000002E4: conv.i.v
000002E8: push.imm.e 705
000002EC: conv.i.v
000002F0: call action_create_object(argc=3)
000002F8: popz
000002FC: push.imm.e 0
00000300: conv.i.v
00000304: call action_set_relative(argc=1)
0000030C: popz
00000310: push.imm.e 0
00000314: conv.i.v
00000318: call action_set_relative(argc=1)
00000320: popz