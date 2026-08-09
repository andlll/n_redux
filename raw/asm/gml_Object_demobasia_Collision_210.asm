// gml_Object_demobasia_Collision_210  locals=2 args=0 len=388
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v iessa
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20BCA94
0000004C: push.imm.e 156
00000050: pushenv 0x20BC9B8
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.i 200000
00000064: conv.i.v
00000068: push.v mon
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20BC9B8
00000090: b 0x20BC9C0
00000094: popenv 0x40BC978
00000098: b 0x20BC9C4
0000009C: popenv 0x1CBC9C0
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BCA94
000000B0: push.imm.e 156
000000B4: pushenv 0x20BC9F8
000000B8: push.v mon
000000C0: push.i -200000
000000C8: add.i.v
000000CC: pop.v.v mon
000000D4: popenv 0x40BC9DC
000000D8: push.v other.id
000000E0: conv.v.i
000000E4: pushenv 0x20BCA18
000000E8: call action_kill_object(argc=0)
000000F0: popz
000000F4: popenv 0x40BCA0C
000000F8: push.imm.e 0
000000FC: conv.i.v
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 494
0000010C: conv.i.v
00000110: call action_create_object(argc=3)
00000118: popz
0000011C: push.imm.e 128
00000120: pushenv 0x20BCA54
00000124: call action_kill_object(argc=0)
0000012C: popz
00000130: popenv 0x40BCA48
00000134: push.imm.e 130
00000138: pushenv 0x20BCA6C
0000013C: call action_kill_object(argc=0)
00000144: popz
00000148: popenv 0x40BCA60
0000014C: push.imm.e 129
00000150: pushenv 0x20BCA84
00000154: call action_kill_object(argc=0)
0000015C: popz
00000160: popenv 0x40BCA78
00000164: call action_kill_object(argc=0)
0000016C: popz
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz