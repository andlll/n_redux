// gml_Object_monum_light_Step_0  locals=2 args=0 len=552
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2111508
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2111508
00000040: b 0x2111510
00000044: popenv 0x41114CC
00000048: b 0x2111514
0000004C: popenv 0x1D11510
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2111608
00000060: push.imm.e 156
00000064: pushenv 0x2111568
00000068: push.imm.e 4
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.v ele
00000080: call action_if_variable(argc=3)
00000088: pop.v.v local.__b__
00000090: push.local.v local.__b__
00000098: conv.v.b
0000009C: bf 0x2111568
000000A0: b 0x2111570
000000A4: popenv 0x411152C
000000A8: b 0x2111574
000000AC: popenv 0x1D11570
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2111608
000000C0: push.imm.e 0
000000C4: conv.i.v
000000C8: push.imm.e 0
000000CC: conv.i.v
000000D0: push.v trans
000000D8: call action_if_variable(argc=3)
000000E0: pop.v.v local.__b__
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x2111608
000000F8: push.imm.e -1
000000FC: conv.i.v
00000100: push.imm.e 79
00000104: conv.i.v
00000108: push.imm.e 398
0000010C: conv.i.v
00000110: call action_sprite_set(argc=3)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 80
00000128: conv.i.v
0000012C: call action_set_alarm(argc=2)
00000134: popz
00000138: push.imm.e 1
0000013C: pop.v.i trans
00000144: push.imm.e 455
00000148: pushenv 0x211164C
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: push.v night
00000164: call action_if_variable(argc=3)
0000016C: pop.v.v local.__b__
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x211164C
00000184: b 0x2111654
00000188: popenv 0x4111610
0000018C: b 0x2111658
00000190: popenv 0x1D11654
00000194: push.local.v local.__b__
0000019C: conv.v.b
000001A0: bf 0x21116EC
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: push.imm.e 1
000001B0: conv.i.v
000001B4: push.v trans
000001BC: call action_if_variable(argc=3)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x21116EC
000001DC: push.imm.e 1
000001E0: conv.i.v
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: push.imm.e 398
000001F0: conv.i.v
000001F4: call action_sprite_set(argc=3)
000001FC: popz
00000200: push.imm.e 1
00000204: conv.i.v
00000208: push.imm.e 80
0000020C: conv.i.v
00000210: call action_set_alarm(argc=2)
00000218: popz
0000021C: push.imm.e 0
00000220: pop.v.i trans