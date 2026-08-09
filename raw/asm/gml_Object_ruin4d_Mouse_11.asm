// gml_Object_ruin4d_Mouse_11  locals=2 args=0 len=504
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x2138EA0
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2138EA0
00000040: b 0x2138EA8
00000044: popenv 0x4138E64
00000048: b 0x2138EAC
0000004C: popenv 0x1D38EA8
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2138EDC
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 455
00000084: pushenv 0x2138F20
00000088: push.imm.e 0
0000008C: conv.i.v
00000090: push.imm.e 1
00000094: conv.i.v
00000098: push.v dawn
000000A0: call action_if_variable(argc=3)
000000A8: pop.v.v local.__b__
000000B0: push.local.v local.__b__
000000B8: conv.v.b
000000BC: bf 0x2138F20
000000C0: b 0x2138F28
000000C4: popenv 0x4138EE4
000000C8: b 0x2138F2C
000000CC: popenv 0x1D38F28
000000D0: push.local.v local.__b__
000000D8: conv.v.b
000000DC: bf 0x2138F5C
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.i 15201023
000000F0: conv.i.v
000000F4: call action_sprite_color(argc=2)
000000FC: popz
00000100: push.imm.e 455
00000104: pushenv 0x2138FA0
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 0
00000114: conv.i.v
00000118: push.v dawn
00000120: call action_if_variable(argc=3)
00000128: pop.v.v local.__b__
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x2138FA0
00000140: b 0x2138FA8
00000144: popenv 0x4138F64
00000148: b 0x2138FAC
0000014C: popenv 0x1D38FA8
00000150: push.local.v local.__b__
00000158: conv.v.b
0000015C: bf 0x213903C
00000160: push.imm.e 455
00000164: pushenv 0x2139000
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: push.imm.e 0
00000174: conv.i.v
00000178: push.v night
00000180: call action_if_variable(argc=3)
00000188: pop.v.v local.__b__
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x2139000
000001A0: b 0x2139008
000001A4: popenv 0x4138FC4
000001A8: b 0x213900C
000001AC: popenv 0x1D39008
000001B0: push.local.v local.__b__
000001B8: conv.v.b
000001BC: bf 0x213903C
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: push.i 16777215
000001D0: conv.i.v
000001D4: call action_sprite_color(argc=2)
000001DC: popz
000001E0: push.imm.e 663
000001E4: pushenv 0x2139050
000001E8: call action_kill_object(argc=0)
000001F0: popz
000001F4: popenv 0x4139044