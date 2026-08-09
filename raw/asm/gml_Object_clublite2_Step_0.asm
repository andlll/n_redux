// gml_Object_clublite2_Step_0  locals=2 args=0 len=764
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2134F24
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2134F24
00000040: b 0x2134F2C
00000044: popenv 0x4134EE8
00000048: b 0x2134F30
0000004C: popenv 0x1D34F2C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2134FFC
00000060: push.imm.e 156
00000064: pushenv 0x2134F84
00000068: push.imm.e 3
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x2134F84
000000A0: b 0x2134F8C
000000A4: popenv 0x4134F48
000000A8: b 0x2134F90
000000AC: popenv 0x1D34F8C
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2134FFC
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x2134FFC
000000F8: push.imm.e 1
000000FC: conv.i.v
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 518
0000010C: conv.i.v
00000110: call action_sprite_set(argc=3)
00000118: popz
0000011C: push.imm.e 455
00000120: pushenv 0x2135040
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: push.v night
0000013C: call action_if_variable(argc=3)
00000144: pop.v.v local.__b__
0000014C: push.local.v local.__b__
00000154: conv.v.b
00000158: bf 0x2135040
0000015C: b 0x2135048
00000160: popenv 0x4135004
00000164: b 0x213504C
00000168: popenv 0x1D35048
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x213511C
0000017C: push.imm.e 156
00000180: pushenv 0x21350A0
00000184: push.imm.e 4
00000188: conv.i.v
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.v ele
0000019C: call action_if_variable(argc=3)
000001A4: pop.v.v local.__b__
000001AC: push.local.v local.__b__
000001B4: conv.v.b
000001B8: bf 0x21350A0
000001BC: b 0x21350A8
000001C0: popenv 0x4135064
000001C4: b 0x21350AC
000001C8: popenv 0x1D350A8
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x213511C
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.v trans
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x213511C
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 2
00000220: conv.i.v
00000224: call action_set_alarm(argc=2)
0000022C: popz
00000230: push.imm.e 1
00000234: pop.v.i trans
0000023C: push.imm.e 455
00000240: pushenv 0x2135160
00000244: push.imm.e 0
00000248: conv.i.v
0000024C: push.imm.e 0
00000250: conv.i.v
00000254: push.v night
0000025C: call action_if_variable(argc=3)
00000264: pop.v.v local.__b__
0000026C: push.local.v local.__b__
00000274: conv.v.b
00000278: bf 0x2135160
0000027C: b 0x2135168
00000280: popenv 0x4135124
00000284: b 0x213516C
00000288: popenv 0x1D35168
0000028C: push.local.v local.__b__
00000294: conv.v.b
00000298: bf 0x21351DC
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: push.imm.e 1
000002A8: conv.i.v
000002AC: push.v trans
000002B4: call action_if_variable(argc=3)
000002BC: pop.v.v local.__b__
000002C4: push.local.v local.__b__
000002CC: conv.v.b
000002D0: bf 0x21351DC
000002D4: push.imm.e 1
000002D8: conv.i.v
000002DC: push.imm.e 2
000002E0: conv.i.v
000002E4: call action_set_alarm(argc=2)
000002EC: popz
000002F0: push.imm.e 0
000002F4: pop.v.i trans