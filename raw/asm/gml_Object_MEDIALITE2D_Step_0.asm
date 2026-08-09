// gml_Object_MEDIALITE2D_Step_0  locals=2 args=0 len=764
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x21265AC
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21265AC
00000040: b 0x21265B4
00000044: popenv 0x4126570
00000048: b 0x21265B8
0000004C: popenv 0x1D265B4
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2126684
00000060: push.imm.e 156
00000064: pushenv 0x212660C
00000068: push.imm.e 3
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x212660C
000000A0: b 0x2126614
000000A4: popenv 0x41265D0
000000A8: b 0x2126618
000000AC: popenv 0x1D26614
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2126684
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x2126684
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 518
0000010C: conv.i.v
00000110: call action_sprite_set(argc=3)
00000118: popz
0000011C: push.imm.e 455
00000120: pushenv 0x21266C8
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: push.v night
0000013C: call action_if_variable(argc=3)
00000144: pop.v.v local.__b__
0000014C: push.local.v local.__b__
00000154: conv.v.b
00000158: bf 0x21266C8
0000015C: b 0x21266D0
00000160: popenv 0x412668C
00000164: b 0x21266D4
00000168: popenv 0x1D266D0
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x21267A4
0000017C: push.imm.e 156
00000180: pushenv 0x2126728
00000184: push.imm.e 4
00000188: conv.i.v
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.v ele
0000019C: call action_if_variable(argc=3)
000001A4: pop.v.v local.__b__
000001AC: push.local.v local.__b__
000001B4: conv.v.b
000001B8: bf 0x2126728
000001BC: b 0x2126730
000001C0: popenv 0x41266EC
000001C4: b 0x2126734
000001C8: popenv 0x1D26730
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x21267A4
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.v trans
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x21267A4
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 10
00000220: conv.i.v
00000224: call action_set_alarm(argc=2)
0000022C: popz
00000230: push.imm.e 1
00000234: pop.v.i trans
0000023C: push.imm.e 455
00000240: pushenv 0x21267E8
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.imm.e 0
00000250: conv.i.v
00000254: push.v night
0000025C: call action_if_variable(argc=3)
00000264: pop.v.v local.__b__
0000026C: push.local.v local.__b__
00000274: conv.v.b
00000278: bf 0x21267E8
0000027C: b 0x21267F0
00000280: popenv 0x41267AC
00000284: b 0x21267F4
00000288: popenv 0x1D267F0
0000028C: push.local.v local.__b__
00000294: conv.v.b
00000298: bf 0x2126864
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: push.imm.e 1
000002A8: conv.i.v
000002AC: push.v trans
000002B4: call action_if_variable(argc=3)
000002BC: pop.v.v local.__b__
000002C4: push.local.v local.__b__
000002CC: conv.v.b
000002D0: bf 0x2126864
000002D4: push.imm.e 1
000002D8: conv.i.v
000002DC: push.imm.e 10
000002E0: conv.i.v
000002E4: call action_set_alarm(argc=2)
000002EC: popz
000002F0: push.imm.e 0
000002F4: pop.v.i trans