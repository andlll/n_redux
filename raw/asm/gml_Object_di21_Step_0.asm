// gml_Object_di21_Step_0  locals=2 args=0 len=464
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2117088
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2117088
00000040: b 0x2117090
00000044: popenv 0x411704C
00000048: b 0x2117094
0000004C: popenv 0x1D17090
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x211712C
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.v trans
00000078: call action_if_variable(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x211712C
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 992
000000AC: conv.i.v
000000B0: call action_sprite_set(argc=3)
000000B8: popz
000000BC: push.imm.e 2
000000C0: conv.i.v
000000C4: push.imm.e 59
000000C8: conv.i.v
000000CC: call action_set_alarm(argc=2)
000000D4: popz
000000D8: push.imm.e 1
000000DC: pop.v.i trans
000000E4: exit
000000E8: push.imm.e 455
000000EC: pushenv 0x2117170
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.v night
00000108: call action_if_variable(argc=3)
00000110: pop.v.v local.__b__
00000118: push.local.v local.__b__
00000120: conv.v.b
00000124: bf 0x2117170
00000128: b 0x2117178
0000012C: popenv 0x4117134
00000130: b 0x211717C
00000134: popenv 0x1D17178
00000138: push.local.v local.__b__
00000140: conv.v.b
00000144: bf 0x2117214
00000148: push.imm.e 0
0000014C: conv.i.v
00000150: push.imm.e 1
00000154: conv.i.v
00000158: push.v trans
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x2117214
00000180: push.imm.e -1
00000184: conv.i.v
00000188: push.imm.e 59
0000018C: conv.i.v
00000190: push.imm.e 991
00000194: conv.i.v
00000198: call action_sprite_set(argc=3)
000001A0: popz
000001A4: push.imm.e 3
000001A8: conv.i.v
000001AC: push.imm.e 59
000001B0: conv.i.v
000001B4: call action_set_alarm(argc=2)
000001BC: popz
000001C0: push.imm.e 0
000001C4: pop.v.i trans
000001CC: exit